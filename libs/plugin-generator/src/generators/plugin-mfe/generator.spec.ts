/* Copyright (c) 2022 VMware, Inc. All rights reserved. -- VMware Confidential */
import { readProjectConfiguration, Tree } from '@nrwl/devkit';

import { initializeWorkspaceTree } from '../../generator-constants';
import generator from './generator';
import { ServiceMfeGeneratorSchema } from './schema';

describe('plugin-mfe generator', () => {
  let tree: Tree;
  const options: ServiceMfeGeneratorSchema = { name: 'my-service', port: 3300 };

  beforeEach(() => {
    tree = initializeWorkspaceTree();
  });

  // TODO see later what changed in nx 15: my-service prefix was removed
  xit('should run successfully', async () => {
    await generator(tree, options);
    const configMfe = readProjectConfiguration(tree, 'my-service-mfe');
    const configData = readProjectConfiguration(tree, 'data-access');
    const configUi = readProjectConfiguration(tree, 'ui');

    expect(configMfe).toBeDefined();
    expect(configData).toBeDefined();
    expect(configUi).toBeDefined();
    expect(tree.children('apps')).toContain('my-service-mfe');
    // TODO add later
    // expect(tree.children('apps')).toContain('my-service-mfe-e2e');
  });
});
