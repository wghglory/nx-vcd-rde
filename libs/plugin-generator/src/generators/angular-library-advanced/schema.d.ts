export interface AngularLibraryGeneratorSchema {
  type: 'feature' | 'ui' | 'data-access' | 'util' | 'model' | 'all';
  scope: 'shared' | 'core' | 'tenant' | 'provider';
  domain?: string;
  name: string;
  addTailwind?: boolean;
  skipFormat?: boolean;
  /**
   * @deprecated Use `simpleName` instead. It will be removed in v16.
   */
  simpleModuleName?: boolean;
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
