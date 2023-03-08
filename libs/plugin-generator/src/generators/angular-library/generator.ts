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

function normalizeOptions(tree: Tree, options: AngularLibraryGeneratorSchema): NormalizedSchema {
  let projectDirectory = '';
  let tags = '';

  if (options.domain) {
    // const name = names(options.name).fileName;
    const domainFileName = names(options.domain).fileName;
    projectDirectory = `${options.scope}/${domainFileName}`;
    tags = `scope:${options.scope},domain:${domainFileName},type:${options.type},framework:angular`;
  } else {
    projectDirectory = options.scope;
    tags = `scope:${options.scope},type:${options.type},framework:angular`;
  }

  const projectName = `${projectDirectory.replace(new RegExp('/', 'g'), '-')}-${options.type}`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}/${options.type}`;
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
    scopeClassName: names(options.scope).className,
    domainClassName: names(options.domain).className,
    scopeFileName: names(options.scope).fileName,
    domainFileName: names(options.domain).fileName,
    ...names(options.domain),
    relativeOffset: offsetFromRoot(options.projectRoot),
    template: '',
  };

  const type = options.type;
  generateFiles(tree, path.join(__dirname, type), options.projectRoot, templateOptions);
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
