import { NextFunction, Request, Response } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    // const authorization = req.headers[X_VCLOUD_AUTHORIZATION];
    const { authorization } = req.headers;
    // login request doesn't need to check X_VCLOUD_AUTHORIZATION, pass; other request need to check token
    if (req.method === 'POST' && req.url.includes('/api/sessions')) {
      next();
      return;
    }

    if (!authorization) {
      return res.status(401).json({ message: 'User is not authorized' });
    }

    next();
  } catch (error) {
    next(error);
  }
}
