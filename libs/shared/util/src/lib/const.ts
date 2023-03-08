export const TENANT_CONTEXT = 'X-VMWARE-VCLOUD-TENANT-CONTEXT';
export const AUTH_CONTEXT = 'X-VMWARE-VCLOUD-AUTH-CONTEXT';
export const AUTH_TOKEN = 'authtoken'; // vcd token in localStorage, passing X-vCloud-Authorization header using this value is optional
export const X_VCLOUD_AUTHORIZATION = 'x-vcloud-authorization';

export const DOMAIN_REGEX = new RegExp(
  '^(https?://)?(((www\\.)?([-a-zA-Z0-9]{1,63}\\.)*?[a-zA-Z0-9][-a-zA-Z0-9]{0,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{2,4})?(/[-\\w@\\+\\.~#\\?&/=%]*)?$',
);

export const apiPrefix = '/cloudapi/1.0.0';

export const CLR_DG_DEFAULT_STATE = { page: { from: -1, to: -1, size: 10, current: 1 } };
