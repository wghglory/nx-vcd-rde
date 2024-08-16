import { readProjectConfiguration, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import generator from './generator';
import { TypescriptLibraryGeneratorSchema } from './schema';

describe('typescript-library generator', () => {
  let appTree: Tree;
  const options: TypescriptLibraryGeneratorSchema = { type: 'model', scope: 'provider' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'provider-model');
    expect(config).toBeDefined();
  });
});
