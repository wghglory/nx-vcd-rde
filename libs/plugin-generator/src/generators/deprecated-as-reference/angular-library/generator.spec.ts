import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import generator from './generator';
import { AngularLibraryGeneratorSchema } from './schema';

describe('angular library generator', () => {
  let appTree: Tree;
  const options = { domain: 'test', scope: 'shared', type: 'ui' } as AngularLibraryGeneratorSchema;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'shared-test-ui');
    expect(config).toBeDefined();
  });
});
