import { TypescriptGeneratorType } from './../generator.model';

export interface TypescriptLibraryGeneratorSchema {
  type: TypescriptGeneratorType;
  scope: 'shared' | 'core' | 'tenant' | 'provider';
  domain: string;
}
