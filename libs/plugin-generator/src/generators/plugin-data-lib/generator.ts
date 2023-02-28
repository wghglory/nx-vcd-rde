/* Copyright (c) 2022 VMware, Inc. All rights reserved. -- VMware Confidential */
import { addProjectConfiguration, generateFiles, getWorkspaceLayout, names, offsetFromRoot, Tree, updateJson } from '@nrwl/devkit';
import * as path from 'path';

import { PluginNormalizedSchema } from '../plugin-mfe/generator';

// Add the new files in libs/my-service/data-access
function addFiles(tree: Tree, options: PluginNormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    // remove __tmpl__ in template file names
    tmpl: '',
  };
  generateFiles(tree, path.join(__dirname, 'files/src/data-access'), options.projectRoot, templateOptions);
}

function modifyJsonFiles(tree: Tree, options: PluginNormalizedSchema) {
  // Add entry to tsconfig.base.json
  updateJson(tree, 'tsconfig.base.json', configJson => {
    configJson.compilerOptions.paths[`@ccs-ui/${options.name}-data-access`] = [`libs/${options.name}/data-access/src/index.ts`];
    // return modified JSON object
    return configJson;
  });

  // Add entry to .eslintrc.json
  try {
    updateJson(tree, '.eslintrc.json', eslintJson => {
      eslintJson.overrides[0].rules['@nrwl/nx/enforce-module-boundaries'][1].depConstraints.push({
        sourceTag: `${options.name}:data`,
        onlyDependOnLibsWithTags: ['ccs:sdk'],
      });
      // return modified JSON object
      return eslintJson;
    });
  } catch (error) {
    console.log('WARNING: failed to update .eslintrc.json. ' + error);
  }
}

// Function generatePluginDataLib is called from plugin-mfe generator
export function generatePluginDataLib(tree: Tree, options: PluginNormalizedSchema) {
  // We must first change some names for the data-access lib
  const name = options.name;
  options.projectName = name + '-data-access'; // my-service-data-access
  options.projectDirectory = 'data-access';
  // projectRoot is set to /libs/my-service/data-access
  options.projectRoot = `${getWorkspaceLayout(tree).libsDir}/${name}/${options.projectDirectory}`;

  addProjectConfiguration(tree, options.projectName, {
    root: options.projectRoot,
    projectType: 'library',
  });
  addFiles(tree, options);
  modifyJsonFiles(tree, options);
}

// TODO: see later if we want to use the plugin-data-lib generator separately
// export default async function (tree: Tree, options: PluginDataLibGeneratorSchema) {
//    const normalizedOptions = normalizeOptions(tree, options);

//    addProjectConfiguration(tree, normalizedOptions.projectName, {
//       root: normalizedOptions.projectRoot,
//       projectType: 'library',
//    });
//    addFiles(tree, normalizedOptions);
//    await formatFiles(tree);
// }
