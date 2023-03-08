---
inject: true
to: apps/api/src/main.ts
after: <!--COMMON_ENTITY_ROUTES-->
---
app.use(`/api/<%=h.inflection.pluralize(entityType)%>`, <%=entityType%>Router);
