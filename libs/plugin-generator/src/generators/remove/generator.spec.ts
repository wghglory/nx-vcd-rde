/* Copyright (c) 2022 VMware, Inc. All rights reserved. -- VMware Confidential */
import { Tree } from '@nrwl/devkit';

import { initializeWorkspaceTree } from '../../generator-constants';
import pluginMfeGenerator from '../plugin-mfe/generator';

import generator from './generator';
import { RemoveGeneratorSchema } from './schema';

describe('remove generator', () => {
   let tree: Tree;
   const options: RemoveGeneratorSchema = { projectName: 'test-service-mfe' };

   beforeEach(async () => {
      tree = initializeWorkspaceTree();
      await pluginMfeGenerator(tree, {
         name: 'test-service',
         port: 3040,
      });
   });

   // TODO restore later, nx 15 changed something...
   xit('should run successfully', async () => {
      await generator(tree, options);
      expect(tree.children('apps')).not.toContain('test-service-mfe');
      expect(tree.children('apps')).not.toContain('test-service-mfe-e2e');
      expect(tree.children('libs')).not.toContain('test-service-ui');
      expect(tree.children('libs')).not.toContain('test-service-data-access');
   });
});
