---
inject: true
to: main.ts
after: import[^]*;
---
import <%=entityType%>Router from './routes/<%=entityType%>.route';
