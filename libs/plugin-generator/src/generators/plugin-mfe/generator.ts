/* Copyright (c) 2022 VMware, Inc. All rights reserved. -- VMware Confidential */
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  readJson,
  readNxJson,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import * as path from 'path';

import { mfePortsJsonFile, seedProjectJsonFile, servicePluginJsonFile } from '../../generator-constants';
import { generatePluginDataLib } from '../plugin-data-lib/generator';
import { generatePluginUiLib } from '../plugin-ui-lib/generator';
import { ServiceMfeGeneratorSchema } from './schema';

export interface PluginNormalizedSchema extends ServiceMfeGeneratorSchema {
  displayName: string; // My Service
  camelName: string; // myService
  fullName: string; // MyService
  mfeName: string; // my-service-mfe
  projectName: string; // my-service-mfe
  projectRoot: string; // apps/my-service-mfe
  projectDirectory: string; // my-service-mfe
}

/**
 * Generator default entry point
 * @param tree
 * @param options
 */
export default async function pluginMfeGenerator(tree: Tree, options: ServiceMfeGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  // Check if running in ccs-ui-sdk
  const config = readNxJson(tree);
  const isCcsUiSdkWorkspace = config.npmScope === 'ccs-ui-sdk';

  // No files get generated if validation fails
  validateInputParams(tree, normalizedOptions, isCcsUiSdkWorkspace);

  addAppsFiles(tree, normalizedOptions);
  modifyJsonFiles(tree, normalizedOptions);
  if (!isCcsUiSdkWorkspace) {
    modifyNonSdkJsonFiles(tree, normalizedOptions);
  }

  generatePluginUiLib(tree, normalizedOptions);
  generatePluginDataLib(tree, normalizedOptions);

  await formatFiles(tree);
}

function normalizeOptions(tree: Tree, options: ServiceMfeGeneratorSchema): PluginNormalizedSchema {
  // Force the name to have the my-service format
  options.name = names(options.name).fileName;
  const displayName = options.name
    .split('-')
    .map(n => n.charAt(0).toUpperCase() + n.slice(1))
    .join(' '); // My Service
  const camelName = names(options.name).propertyName; // myPlugin
  const fullName = names(options.name).className; // MyPlugin
  const mfeName = options.name + '-mfe'; // my-service-mfe
  const projectDirectory = mfeName; // my-service-mfe
  const projectName = mfeName; // my-service-mfe
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`; // apps/my-service-mfe

  return {
    ...options,
    displayName,
    camelName,
    fullName,
    mfeName,
    projectName,
    projectRoot,
    projectDirectory,
  };
}

function validateInputParams(tree: Tree, options: PluginNormalizedSchema, isCcsUiSdkWorkspace: boolean) {
  // Use a partial mfe project configuration to validate the name and update angular.json
  // The full project.json is added in addFiles()
  addProjectConfiguration(tree, options.projectName, {
    root: options.projectRoot,
    projectType: 'application',
  });
  addProjectConfiguration(tree, options.projectName + '-e2e', {
    root: options.projectRoot + '-e2e',
    projectType: 'application',
  });

  // Verify if port is already used
  if (!isCcsUiSdkWorkspace) {
    const mfePortsJson = readJson(tree, mfePortsJsonFile);
    if (mfePortsJson.find(entry => entry.port === options.port)) {
      throw new Error(`Port ${options.port} is already used :-(`);
    }
  }
}

function addAppsFiles(tree: Tree, options: PluginNormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    // remove __tmpl__ in template file names
    tmpl: '',
  };
  generateFiles(tree, path.join(__dirname, 'files/apps/sample-plugin-mfe'), options.projectRoot, templateOptions);
  generateFiles(tree, path.join(__dirname, 'files/apps/sample-plugin-mfe-e2e'), options.projectRoot + '-e2e', templateOptions);
}

function modifyJsonFiles(tree: Tree, options: PluginNormalizedSchema) {
  try {
    // Add entry to .eslintrc.json
    updateJson(tree, '.eslintrc.json', eslintJson => {
      eslintJson.overrides[0].rules['@nrwl/nx/enforce-module-boundaries'][1].depConstraints.push({
        sourceTag: `${options.name}:app`,
        onlyDependOnLibsWithTags: ['ccs:sdk', `${options.name}:ui`, `${options.name}:data`],
      });
      // return modified JSON object
      return eslintJson;
    });
  } catch (error) {
    console.log('WARNING: failed to update .eslintrc.json. ' + error);
  }
}

function modifyNonSdkJsonFiles(tree: Tree, options: PluginNormalizedSchema) {
  try {
    // Add entry to proxy.conf.json
    updateJson(tree, 'proxy.conf.json', proxyJson => {
      const pathRewrite = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pathRewrite[`^/ccs-ui/plugin/${options.mfeName}`] = '';
      proxyJson[`/ccs-ui/plugin/${options.mfeName}`] = {
        target: `http://localhost:${options.port}`,
        pathRewrite: pathRewrite,
        secure: false,
      };
      // return modified JSON object
      return proxyJson;
    });
  } catch (error) {
    console.log('WARNING: failed to update proxy.conf.json. ' + error);
  }

  try {
    // Add entry to local-plugins.json
    updateJson(tree, servicePluginJsonFile, pluginJson => {
      pluginJson['local-plugins'].push({
        description: `Generated plugin ${options.fullName}`,
        docBaseUrl: 'https://somewhere/demo.ccsplugins.vmware.com/1.0.0/doc',
        id: `${options.name}.ccsplugins.vmware.com`,
        name: `${options.displayName}`,
        uiBaseUrl: `./plugin/${options.mfeName}/`,
        version: '1.0.0',
      });
      // return modified JSON object
      return pluginJson;
    });
  } catch (error) {
    console.log(`WARNING: failed to update ${servicePluginJsonFile}. ` + error);
  }

  try {
    // Add entry to mfe-ports.json
    updateJson(tree, mfePortsJsonFile, configJson => {
      configJson.push({ name: options.mfeName, port: options.port });
      // return modified JSON object
      return configJson;
    });
  } catch (error) {
    console.log(`WARNING: failed to update ${mfePortsJsonFile}. ` + error);
  }

  try {
    // Add entry to ccs-ui project.json to start the new plugin
    updateJson(tree, seedProjectJsonFile, projectJson => {
      projectJson.targets.serve_plugins.options.commands.push(`nx serve ${options.mfeName}`);
      // return modified JSON object
      return projectJson;
    });
  } catch (error) {
    console.log(`WARNING: failed to update ${seedProjectJsonFile}. ` + error);
  }
}
