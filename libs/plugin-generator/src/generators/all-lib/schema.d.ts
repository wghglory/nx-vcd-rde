export interface AllLibGeneratorSchema {
  // custom fields
  scope: GeneratorScope;
  domain?: string;
  mfeName?: string;
  richTemplate?: boolean;

  // angular defaults
  name: string;
  directory?: string;
}
