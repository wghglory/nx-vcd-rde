// https://github.com/nrwl/nx/blob/master/packages/angular/src/generators/remote/schema.d.ts

export interface MfeAppGeneratorSchema {
  // custom fields
  displayName?: string; // used to display the remote app name
  description?: string;
  // generator defaults as below
  name: string;
  host?: string;
  port?: number;
  setParserOptionsProject?: boolean;
  skipPackageJson?: boolean;
  addTailwind?: boolean;
  prefix?: string;
  style?: Styles;
  skipTests?: boolean;
  directory?: string;
  tags?: string;
  linter?: Linter;
  unitTestRunner?: UnitTestRunner;
  e2eTestRunner?: E2eTestRunner;
  backendProject?: string;
  strict?: boolean;
  standaloneConfig?: boolean;
  inlineStyle?: boolean;
  inlineTemplate?: boolean;
  viewEncapsulation?: 'Emulated' | 'Native' | 'None';
  skipFormat?: boolean;
  standalone?: boolean;
  ssr?: boolean;
}
