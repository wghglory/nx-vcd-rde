import { TypescriptGeneratorType } from '../generator.model';

export interface TsLibGeneratorSchema {
  type: TypescriptGeneratorType;
  scope: GeneratorScope;
  domain?: string;
  mfeName?: string;
  richTemplate?: boolean;
  name: string;
  directory?: string;

  tags?: string;
}
