import { GeneratorScope, TypescriptGeneratorType } from '../../generator.model';

export interface TypescriptLibraryGeneratorSchema {
  type: TypescriptGeneratorType;
  scope: GeneratorScope;
  domain?: string;
}
