---
inject: true
to: apps/api/src/main.ts
after: <!--ENTITY_ROUTES-->
---
  <%=entityType%>Router,
