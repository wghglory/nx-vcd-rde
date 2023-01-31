import express from 'express';

import { tenants } from '../data/tenants.data';

export const tenantRouter = express.Router();

tenantRouter.get('/', (req, res) => {
  const token = req.headers.authorization;
  const limit = Number(req.query.limit) || 1000;
  const offset = Number(req.query.offset) || 0;
  const filter = req.query.filter; // (status==OPEN)
  const filterObj = {} as any;

  const items = tenants;

  if (!token) {
    // If not authenticated, respond with a 403 error
    res.status(403).json({
      message: 'Not authorized',
    });
  }

  res.send({
    items: items.slice(offset, limit + offset),
    pageInfo: {
      limit,
      offset,
      total: items.length,
    },
  });
});

tenantRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const found = tenants.find(t => t.id === id);

  if (found) {
    res.send(found);
  } else {
    res.status(404).json({
      message: 'No tenant found',
    });
  }
});
