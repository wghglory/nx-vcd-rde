import { AngularGeneratorType } from '../generator.model';

export interface MfeLibGeneratorSchema {
  type: AngularGeneratorType;
  scope: GeneratorScope;
  mfeName: string;
  name: string;
  addTailwind?: boolean;
  skipFormat?: boolean;
  simpleName?: boolean;
  addModuleSpec?: boolean;
  directory?: string;
  sourceDir?: string;
  buildable?: boolean;
  publishable?: boolean;
  importPath?: string;
  standaloneConfig?: boolean;
  spec?: boolean;
  flat?: boolean;
  commonModule?: boolean;
  prefix?: string;
  routing?: boolean;
  lazy?: boolean;
  parent?: string;
  tags?: string;
  strict?: boolean;
  linter?: Linter;
  unitTestRunner?: UnitTestRunner;
  compilationMode?: 'full' | 'partial';
  setParserOptionsProject?: boolean;
  skipModule?: boolean;
  skipPackageJson?: boolean;
  standalone?: boolean;
  displayBlock?: boolean;
  inlineStyle?: boolean;
  inlineTemplate?: boolean;
  viewEncapsulation?: 'Emulated' | 'None' | 'ShadowDom';
  changeDetection?: 'Default' | 'OnPush';
  style?: 'css' | 'scss' | 'sass' | 'less' | 'none';
  skipTests?: boolean;
  selector?: string;
  skipSelector?: boolean;
}
