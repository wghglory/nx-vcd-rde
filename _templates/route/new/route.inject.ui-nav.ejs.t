---
inject: true
to: libs/core/feature/src/lib/navbar/navbar.component.html
after: <!--NAV_LINK-->
---

    <a routerLink="/<%=h.inflection.pluralize(entityType)%>" routerLinkActive="active" class="nav-link"><span class="nav-text"><%=h.capitalize(entityType)%></span></a>
