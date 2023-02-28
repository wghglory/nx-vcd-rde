/* Copyright (c) 2022 VMware, Inc. All rights reserved. -- VMware Confidential */
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

export const mfePortsJsonFile = 'libs/sdk/utils/src/lib/service-mfe/mfe-ports.json';
export const servicePluginJsonFile = 'libs/sdk/utils/src/lib/service-mfe/local-plugins.json';
export const seedProjectJsonFile = 'apps/seed/project.json';

/**
 * Initialize workspace files for testing, i.e. start with Nx createTreeWithEmptyWorkspace
 * and add the other needed files.
 */
export const initializeWorkspaceTree = () => {
  const tree = createTreeWithEmptyWorkspace();
  tree.write(
    '.eslintrc.json',
    String.raw`
        {
         "overrides": [
            {
               "rules": {
                  "@nrwl/nx/enforce-module-boundaries": [
                     "error",
                     {
                        "depConstraints": [
                        ]
                     }
                  ]
               }
            }
         ]
        }
      `,
  );
  tree.write('proxy.conf.json', String.raw`{}`);
  tree.write(mfePortsJsonFile, String.raw`[]`);
  tree.write(
    servicePluginJsonFile,
    String.raw`{
         "local-plugins": []
      }
   `,
  );

  return tree;
};
