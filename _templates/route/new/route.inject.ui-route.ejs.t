---
inject: true
to: apps/seed/src/app/app.routes.ts
after: <!--UI_ENTITY_ROUTES-->
---

  {
    path: '<%=h.inflection.pluralize(entityType)%>',
    loadChildren: () => import('@seed/feature/<%=entityType%>/feature').then(m => m.Feature<%=h.capitalize(entityType)%>FeatureModule),
    data: { layout },
  },
