/* Copyright (c) 2022 VMware, Inc. All rights reserved. -- VMware Confidential */
import { addProjectConfiguration, generateFiles, getWorkspaceLayout, names, offsetFromRoot, Tree, updateJson } from '@nrwl/devkit';
import * as path from 'path';

import { PluginNormalizedSchema } from '../plugin-mfe/generator';

// Add the new files in libs/my-service/ui
function addFiles(tree: Tree, options: PluginNormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    // remove __tmpl__ in template file names
    tmpl: '',
    date: new Date().toLocaleString(),
  };
  generateFiles(tree, path.join(__dirname, 'files/src/ui'), options.projectRoot, templateOptions);
}

function modifyJsonFiles(tree: Tree, options: PluginNormalizedSchema) {
  // Add entry to tsconfig.base.json
  updateJson(tree, 'tsconfig.base.json', configJson => {
    configJson.compilerOptions.paths[`@ccs-ui/${options.name}-ui`] = [`libs/${options.name}/ui/src/index.ts`];
    // return modified JSON object
    return configJson;
  });

  // Add entry to .eslintrc.json
  try {
    updateJson(tree, '.eslintrc.json', eslintJson => {
      eslintJson.overrides[0].rules['@nrwl/nx/enforce-module-boundaries'][1].depConstraints.push({
        sourceTag: `${options.name}:ui`,
        onlyDependOnLibsWithTags: ['ccs:sdk', `${options.name}:data`],
      });
      // return modified JSON object
      return eslintJson;
    });
  } catch (error) {
    console.log('WARNING: failed to update .eslintrc.json. ' + error);
  }
}

// Function generatePluginUiLib is called from plugin-mfe generator
export function generatePluginUiLib(tree: Tree, options: PluginNormalizedSchema) {
  // We must first change some names for the ui lib
  const name = options.name;
  options.projectName = name + '-ui'; // my-service-ui
  options.projectDirectory = 'ui';
  // projectRoot is set to /libs/my-service/ui
  options.projectRoot = `${getWorkspaceLayout(tree).libsDir}/${name}/${options.projectDirectory}`;

  addProjectConfiguration(tree, options.projectName, {
    root: options.projectRoot,
    projectType: 'library',
  });
  addFiles(tree, options);
  modifyJsonFiles(tree, options);
}

// TODO: see later if we want to use the plugin-ui-lib generator separately
// export default async function (tree: Tree, options: PluginUiLibGeneratorSchema) {
//    const normalizedOptions = normalizeOptions(tree, options);

//    addProjectConfiguration(tree, normalizedOptions.projectName, {
//       root: normalizedOptions.projectRoot,
//       projectType: 'library',
//    });
//    addFiles(tree, normalizedOptions);
//    await formatFiles(tree);
// }
