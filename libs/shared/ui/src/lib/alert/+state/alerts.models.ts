export type AlertType = 'success' | 'info' | 'warning' | 'danger';

export type Alert = {
  message: string; // l10n message key
  type?: AlertType; // default: danger
  id?: symbol;
  alertKey?: string; // default: global; or a action key like 'delete-bucket'
  params?: Array<string | number>; // message needs l10n parameters
};

export type AlertContent = {
  type: string;
  value: string;
  link?: string;
};

export const GLOBAL = 'global';
