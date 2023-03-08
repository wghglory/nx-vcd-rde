---
inject: true
to: apps/api/src/main.ts
after: <!--RDE_ENTITY_ROUTES-->
---
  <%=entityType%>Router,
