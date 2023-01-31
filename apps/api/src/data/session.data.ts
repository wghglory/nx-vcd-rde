import { VcdSession } from '@seed/shared/models';
/**
 * several valid users to login
 *
 * Provider
 * admin: admin@system | System Administrator
 * pa: pa@system | System Administrator
 *
 * Tenant
 * ta: ta@acme | Organization Administrator
 *
 * tu with different 'roles':
 *    tu@acme | Organization User
 *    tu1@org1 | Harbor User
 *    rachelw2@acme | harbor-viewer  to test when `roles` is not included in FE auth
 */
const users: VcdSession[] = [
  {
    userId: 'urn:vcloud:user:admin-user-id',
    user: 'admin',
    roles: 'System Administrator',
    org: 'System',
    otherAttributes: {},
    link: [],
    href: '',
    type: '',
    locationId: '',
    vCloudExtension: [],
    authorizedLocations: { location: [] },
  },
  {
    userId: 'urn:vcloud:user:pa-user-id',
    user: 'pa',
    roles: 'System Administrator',
    org: 'System',
    otherAttributes: {},
    link: [],
    href: '',
    type: '',
    locationId: '',
    vCloudExtension: [],
    authorizedLocations: { location: [] },
  },
  {
    userId: 'urn:vcloud:user:ta-admin-user-id',
    user: 'ta',
    roles: 'Organization Administrator',
    org: 'acme',
    otherAttributes: {},
    link: [],
    href: '',
    type: '',
    locationId: '',
    vCloudExtension: [],
    authorizedLocations: { location: [] },
  },
  {
    userId: 'urn:vcloud:user:tu-user-id',
    user: 'tu',
    roles: 'Organization User',
    org: 'acme',
    otherAttributes: {},
    link: [],
    href: '',
    type: '',
    locationId: '',
    vCloudExtension: [],
    authorizedLocations: { location: [] },
  },
];

export { users };
