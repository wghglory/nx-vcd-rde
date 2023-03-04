export interface Toast {
  title: string;
  description: string;
  type?: ToastType;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  dismissible?: boolean;
  timeoutSeconds?: number;

  dismissed?: () => void;
  primaryButtonClick?: () => void;
  secondaryButtonClick?: () => void;
}

export enum ToastType {
  SUCCESS = 'success',
  FAILURE = 'failure',
  INFO = 'info',
  WARN = 'warning',
}
