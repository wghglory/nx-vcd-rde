/* Copyright (c) 2022 VMware, Inc. All rights reserved. -- VMware Confidential */
import {
  formatFiles,
  ProjectConfiguration,
  readProjectConfiguration,
  readWorkspaceConfiguration,
  removeProjectConfiguration,
  Tree,
  updateJson,
  visitNotIgnoredFiles,
} from '@nrwl/devkit';

import { mfePortsJsonFile, seedProjectJsonFile, servicePluginJsonFile } from '../../generator-constants';
import { RemoveGeneratorSchema } from './schema';

// Deletes a <service>-mfe project and plugin libraries in /libs/<service>
// and remove <service> references from json files
// For reference, see remove.ts in the Nx code
export default async function (tree: Tree, schema: RemoveGeneratorSchema) {
  const mfeProjectName = schema.projectName;
  if (mfeProjectName.endsWith('-mfe-e2e')) {
    throw new Error('Select the <service>-mfe app, it will also remove the <service>-mfe-e2e project');
  }
  if (!mfeProjectName.endsWith('-mfe')) {
    throw new Error('This project is not a plugin MFE app: ' + mfeProjectName);
  }
  // Check if running in ccs-ui-sdk
  const config = readWorkspaceConfiguration(tree);
  const isCcsUiSdkWorkspace = config.npmScope === 'ccs-ui-sdk';

  // Need to extract all projects first before removing any because it changes
  // the internal workspace structure

  const pluginName = mfeProjectName.substring(0, mfeProjectName.length - 4);
  const mfeE2eProjectName = mfeProjectName + '-e2e';
  const dataLibProjectName = pluginName + '-data-access';
  const uiLibProjectName = pluginName + '-ui';

  const mfeProject = readProjectConfiguration(tree, mfeProjectName);

  let mfeE2eProject;
  try {
    mfeE2eProject = readProjectConfiguration(tree, mfeE2eProjectName);
  } catch (error) {
    console.error(error);
  }

  let dataLibProject;
  try {
    dataLibProject = readProjectConfiguration(tree, dataLibProjectName);
  } catch (error) {
    console.error(error);
  }

  let uiLibProject;
  try {
    uiLibProject = readProjectConfiguration(tree, uiLibProjectName);
  } catch (error) {
    console.error(error);
  }

  removeProjectConfiguration(tree, mfeProjectName);
  removeProject(tree, mfeProject);

  if (mfeE2eProject) {
    removeProjectConfiguration(tree, mfeE2eProjectName);
    removeProject(tree, mfeE2eProject);
  }
  if (dataLibProject) {
    removeProjectConfiguration(tree, dataLibProjectName);
    removeProject(tree, dataLibProject);
  }
  if (uiLibProject) {
    removeProjectConfiguration(tree, uiLibProjectName);
    removeProject(tree, uiLibProject);
  }

  updateJsonFiles(tree, pluginName);
  if (!isCcsUiSdkWorkspace) {
    updateNonSdkJsonFiles(tree, pluginName);
  }
  await formatFiles(tree);
}

// NOTE: removeProject is copied from Nx code because this function is not exported
function removeProject(tree: Tree, project: ProjectConfiguration) {
  visitNotIgnoredFiles(tree, project.root, file => {
    tree.delete(file);
  });
  tree.delete(project.root);
}

function updateJsonFiles(tree: Tree, pluginName: string) {
  updateJson(tree, '.eslintrc.json', json => {
    const contraints = json.overrides[0].rules['@nrwl/nx/enforce-module-boundaries'][1].depConstraints;
    json.overrides[0].rules['@nrwl/nx/enforce-module-boundaries'][1].depConstraints = contraints.filter(
      entry =>
        entry.sourceTag !== `${pluginName}:app` && entry.sourceTag !== `${pluginName}:ui` && entry.sourceTag !== `${pluginName}:data`,
    );
    return json;
  });

  updateJson(tree, 'tsconfig.base.json', json => {
    const paths = json.compilerOptions.paths;
    if (paths[`@ccs-ui/${pluginName}-data-access`]) {
      delete paths[`@ccs-ui/${pluginName}-data-access`];
    }
    if (paths[`@ccs-ui/${pluginName}-ui`]) {
      delete paths[`@ccs-ui/${pluginName}-ui`];
    }
    return json;
  });
}

function updateNonSdkJsonFiles(tree: Tree, pluginName: string) {
  updateJson(tree, 'proxy.conf.json', json => {
    if (json[`/ccs-ui/plugin/${pluginName}-mfe`]) {
      delete json[`/ccs-ui/plugin/${pluginName}-mfe`];
    }
    return json;
  });

  try {
    updateJson(tree, mfePortsJsonFile, json => {
      json = json.filter(entry => entry.name !== `${pluginName}-mfe`);
      return json;
    });
  } catch (error) {
    console.error(error);
  }

  try {
    updateJson(tree, servicePluginJsonFile, json => {
      json['local-plugins'] = json['local-plugins'].filter(entry => entry.id !== `${pluginName}.ccsplugins.vmware.com`);
      return json;
    });
  } catch (error) {
    console.error(error);
  }

  try {
    updateJson(tree, seedProjectJsonFile, json => {
      json.targets.serve_plugins.options.commands = json.targets.serve_plugins.options.commands.filter(
        entry => entry !== `nx serve ${pluginName}-mfe`,
      );
      return json;
    });
  } catch (error) {
    // TODO fix that by detecting when seedProjectJsonFile is not created in the test
    // console.error(error);
  }
}
