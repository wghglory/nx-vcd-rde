import { remote } from '@nrwl/angular/generators';
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { unlink } from 'fs';
import * as path from 'path';

import generateAllRemoteLibs from '../all-lib/generator';
import { mfeConfigPath } from '../generator.const';
import { MfeAppGeneratorSchema } from './schema';

interface NormalizedSchema extends MfeAppGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  removePrefix: (source: string, prefix: string) => string;
}

// official command to generate a remote app: npx nx generate @nrwl/angular:remote content-hub-mfe --host=seed --addTailwind --backendProject=api --port=4303 --style=scss --tags=type:app --no-interactive

// Our generator inputs: name, host?=seed, port?=findNextPort, displayName, description
// Set tailwind, style, tags internally

function normalizeOptions(tree: Tree, options: MfeAppGeneratorSchema): NormalizedSchema {
  const originalName = options.name;

  options.name = `${originalName}-mfe`;

  const name = names(options.name).fileName;
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;

  options.tags = `type:app`;
  options.style = 'scss';
  options.displayName = options.displayName || `${names(options.name).className}`;

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    removePrefix,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

/**
 * Remove 2 useless files that remote generator brings.
 * @param normalizedOptions
 */
async function removeFiles(normalizedOptions: NormalizedSchema) {
  const entryComponentPath = `${normalizedOptions.projectRoot}/src/app/remote-entry/entry.component.ts`;
  const welcomeComponentPath = `${normalizedOptions.projectRoot}/src/app/remote-entry/nx-welcome.component.ts`;
  await unlink(entryComponentPath, err => console.warn(err));
  await unlink(welcomeComponentPath, err => console.warn(err));
}

export default async function (tree: Tree, options: MfeAppGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await remote(tree, normalizedOptions);

  await generateAllRemoteLibs(tree, {
    ...normalizedOptions,
    scope: 'mfe',
    directory: 'mfe',
    mfeName: removePrefix(options.name, '-mfe'),
    richTemplate: true,
  });

  addFiles(tree, normalizedOptions);

  modifyFiles(tree, normalizedOptions);

  await formatFiles(tree);

  return async () => {
    await removeFiles(normalizedOptions);
  };
}

function removePrefix(source: string, prefix: string) {
  return source.replace(prefix, '');
}

function modifyFiles(tree: Tree, normalizedOptions: MfeAppGeneratorSchema) {
  try {
    // Add entry to local-plugins.json
    updateJson(tree, mfeConfigPath, jsonArr => {
      jsonArr.push({
        remoteName: normalizedOptions.name,
        displayName: normalizedOptions.displayName,
        url: `http://localhost:${normalizedOptions.port}`,
        description: 'This is the default description of your remote app. You can edit it in seed/src/assets/mfe-configs.json.',
      });
      return jsonArr;
    });
  } catch (error) {
    console.log(`WARNING: failed to update ${mfeConfigPath}. ` + error);
  }
}
