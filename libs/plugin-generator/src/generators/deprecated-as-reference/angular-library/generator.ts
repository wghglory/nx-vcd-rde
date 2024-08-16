import { libraryGenerator } from '@nx/angular/generators';
import { formatFiles, generateFiles, getWorkspaceLayout, installPackagesTask, names, offsetFromRoot, Tree } from '@nx/devkit';
import * as path from 'path';

import { AngularLibraryGeneratorSchema } from './schema';

interface NormalizedSchema extends AngularLibraryGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
}

function normalizeOptions(tree: Tree, options: AngularLibraryGeneratorSchema): NormalizedSchema {
  let projectDirectory = '';

  if (options.domain) {
    // const name = names(options.name).fileName;
    const domainFileName = names(options.domain).fileName;
    projectDirectory = `${options.scope}/${domainFileName}`;
    options.tags = `scope:${options.scope},domain:${domainFileName},type:${options.type},framework:angular`;
  } else {
    projectDirectory = options.scope;
    options.tags = `scope:${options.scope},type:${options.type},framework:angular`;
  }

  options.name = options.type;
  options.directory = projectDirectory;
  options.changeDetection = 'OnPush';

  const projectName = `${projectDirectory.replace(new RegExp('/', 'g'), '-')}-${options.type}`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}/${options.type}`;

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
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
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  generateFiles(tree, path.join(__dirname, options.type), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: AngularLibraryGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, { ...normalizedOptions });

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
