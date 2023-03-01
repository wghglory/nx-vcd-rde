export interface AllLibrariesGeneratorSchema {
  domain: string;
  scope: 'shared' | 'core' | 'tenant' | 'provider';
}
