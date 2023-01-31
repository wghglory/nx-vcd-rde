---
inject: true
to: server.ts
after: import[^]*;
---
import <%=entityType%>Router from './routes/<%=entityType%>.route';