import { faker } from '@faker-js/faker';
import { X_VCLOUD_AUTHORIZATION } from '@seed/shared/constant';
import { VcdSession } from '@seed/shared/models';
import express, { Application, Request, Response } from 'express';

import { users } from '../data/session.data';

export const authRouter = express.Router();

const tokenPrefix = 'Bearer ';
let currentUser: VcdSession | undefined;
let token = '';

// middleware that is specific to this router
authRouter.use((req, res, next) => {
  // console.log('Time: ', Date.now());
  next();
});

authRouter.post('/sessions', (req: Request, res: Response) => {
  const authorization = req.headers.authorization;

  if (authorization === undefined) {
    return res.status(401).send('Please provide Authorization using basic in headers with base 64 encoding');
  }

  const encoded = authorization.split(' ')[1];
  const decoded = Buffer.from(encoded, 'base64').toString();
  const username = decoded.split(':')[0];
  const password = decoded.split(':')[1];

  const foundUser = users.find(u => u.user === username);
  if (foundUser) {
    currentUser = foundUser;
    token = `${tokenPrefix}${foundUser.user}`;

    res.set('Access-Control-Expose-Headers', X_VCLOUD_AUTHORIZATION);
    res.setHeader(X_VCLOUD_AUTHORIZATION, foundUser.user);
    res.setHeader('jwt', foundUser.user);
    res.json(foundUser);
    // res.json({...foundUser, token: faker.datatype.uuid()});
  } else {
    res.status(401).json({
      message: 'No user found',
    });
  }
});

authRouter.delete('/session', (req, res) => {
  currentUser = undefined;
  token = '';

  res.status(204).send();
});

authRouter.get('/session', (req: Request, res: Response) => {
  // const token = req.headers[X_VCLOUD_AUTHORIZATION] as string;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Not Authorized' });
  }

  if (currentUser) {
    return res.send(currentUser);
  }

  currentUser = getUserByToken(token);
  if (currentUser) {
    res.send(currentUser);
  } else {
    res.status(401).json({ message: `No user found with this token ${token}` });
  }
});

function getUserByToken(token: string) {
  const username = token.replace(tokenPrefix, '');
  const foundUser = users.find(u => u.user === username);
  return foundUser;
}
