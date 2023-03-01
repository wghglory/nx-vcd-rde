import { libraryGenerator } from '@nrwl/angular/generators';
import { formatFiles, generateFiles, getWorkspaceLayout, installPackagesTask, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import * as path from 'path';

import { AngularLibraryGeneratorSchema } from './schema';

interface NormalizedSchema extends AngularLibraryGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  tags: string;
  directory: string;
  name: string;
}

// npx nx generate @seed/plugin-generator:plugin-lib --domain=book --scope=provider --type=data-access --no-interactive
function normalizeOptions(tree: Tree, options: AngularLibraryGeneratorSchema): NormalizedSchema {
  // const name = names(options.name).fileName;
  const projectDirectory = `${options.scope}/${options.domain}`;
  const projectName = `${projectDirectory.replace(new RegExp('/', 'g'), '-')}-${options.type}`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}/${options.type}`;
  const tags = `scope:${options.scope},domain:${options.domain},type:${options.type};framework:angular`;
  const name = options.type;
  const directory = projectDirectory;

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    tags,
    name,
    directory,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.domain),
    relativeOffset: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: AngularLibraryGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  // console.log(normalizedOptions);
  await libraryGenerator(tree, { ...normalizedOptions });

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
