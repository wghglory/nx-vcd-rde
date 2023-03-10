export interface RemoteApp extends MfeConfig {
  path: string;
}

export interface MfeConfig {
  remoteName: string;
  displayName: string;
  url: string;
  description: string;
}
