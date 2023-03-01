import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import generator from './generator';
import { PluginLibGeneratorSchema } from './schema';

describe('plugin-lib generator', () => {
  let appTree: Tree;
  const options: PluginLibGeneratorSchema = { domain: 'test', scope: 'shared', type: 'ui' };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
