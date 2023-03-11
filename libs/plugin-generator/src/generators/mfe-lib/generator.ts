import { libraryGenerator } from '@nrwl/angular/generators';
import { formatFiles, generateFiles, getWorkspaceLayout, installPackagesTask, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import * as path from 'path';

import { MfeLibGeneratorSchema } from './schema';

// inputs: type(feature,data-access,ui), domain(harbor)
// internally set: scope=mfe, tags
// npx nx generate @seed/plugin-generator:angular-library-advanced feature --scope=mfe --type=feature --directory=mfe/harbor --domain=harbor

interface NormalizedSchema extends MfeLibGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
}

function normalizeOptions(tree: Tree, options: MfeLibGeneratorSchema): NormalizedSchema {
  const domainFileName = names(options.domain).fileName; // harbor
  const name = names(options.type).fileName; // data-access

  const projectDirectory = `mfe/${domainFileName}`;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;

  options.tags = `scope:${options.scope},domain:${domainFileName},type:${options.type},framework:angular`;

  options.directory = projectDirectory;
  options.changeDetection = 'OnPush';

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

export default async function (tree: Tree, options: MfeLibGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, { ...normalizedOptions });

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
