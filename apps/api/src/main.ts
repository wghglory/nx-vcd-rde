import cors from 'cors';
import express from 'express';
import * as path from 'path';

import authMiddleware from './middlewares/auth.middleware';
import delayMiddleware from './middlewares/delay.middleware';
import { authRouter } from './routes/auth.route';
import { productRouter } from './routes/product.route';
import { taskRouter } from './routes/task.route';
import { tenantRouter } from './routes/tenant.route';

const app = express();
const apiPrefix = '/cloudapi/1.0.0'; // '/api/v1'

// Body parsing Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(delayMiddleware, authMiddleware);

// app.use(`${apiPrefix}/tenants`, tenantRouter);

// vcd task API
app.use(`/api/task`, taskRouter);

app.use(`/api/products`, productRouter);

// /api/sessions
app.use(`/api`, authRouter);

// RDE routes
app.use(apiPrefix, [
  // DON'T DELETE BELOW COMMENT. It's hygen's insertion point
  // <!--ENTITY_ROUTES-->
  tenantRouter,
]);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
