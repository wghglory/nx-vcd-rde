---
inject: true
to: apps/api/src/main.ts
after: import[^]*;
---

import { <%=entityType%>Router } from './routes/<%=entityType%>.route';
