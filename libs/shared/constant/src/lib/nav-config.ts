import { Role } from '@seed/shared/models';

// Tenant menu items
const homeMenuItem: MenuItem = {
  caption: 'nav.home',
  link: '/tenant/home',
  shape: 'home',
};

export const NAV_CONFIG: Record<Role, MenuItem[]> = {
  'System Administrator': [
    { caption: 'nav.home', link: '/provider/home', shape: 'home' },
    {
      caption: 'nav.tenants',
      link: '/provider/tenants',
      shape: 'organization',
    },
    { caption: 'nav.setting', link: '/provider/setting', shape: 'cog' },
  ],
  'Organization Administrator': [
    homeMenuItem,
    {
      caption: 'nav.setting',
      link: '/tenant/setting',
      shape: 'cog',
    },
  ],
  'Organization User': [homeMenuItem],
};

export interface MenuItem {
  caption: string;
  link: string;
  shape: string;
}
