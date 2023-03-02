import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Linter } from '@nrwl/linter';

import generator from './generator';
import { AngularLibraryGeneratorSchema } from './schema';

describe('angular-library generator', () => {
  let appTree: Tree;
  const options: AngularLibraryGeneratorSchema = {
    name: 'test',
    scope: 'shared',
    type: 'data-access',
    linter: Linter.EsLint,
    style: 'none',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  // it('should run successfully', async () => {
  //   await generator(appTree, options);
  //   const config = readProjectConfiguration(appTree, 'test');
  //   expect(config).toBeDefined();
  // });

  it('should create readme', async () => {
    await generator(appTree, options);
    const readme = appTree.read('test/README.md');
    expect(readme.toString()).toMatchInlineSnapshot(`
      "# test

      This is Angular library for test

      type: data-access
      scope: shared
      "
    `);
  });
});
