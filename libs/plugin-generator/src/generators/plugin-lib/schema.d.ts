export interface PluginLibGeneratorSchema {
  type: 'feature' | 'ui' | 'data-access' | 'util' | 'model' | 'all';
  scope: 'shared' | 'core' | 'tenant' | 'provider';
  domain: string;
}
