import { libraryGenerator } from '@nx/angular/generators';
import { formatFiles, generateFiles, getWorkspaceLayout, installPackagesTask, names, offsetFromRoot, Tree } from '@nx/devkit';
import * as path from 'path';

import { MfeLibGeneratorSchema } from './schema';

// inputs: type(feature,data-access,ui), mfeName(harbor)
// internally set: scope=mfe, tags
// npx nx generate @seed/plugin-generator:angular-library-advanced feature --scope=mfe --type=feature --directory=mfe/harbor --mfeName=harbor

interface NormalizedSchema extends MfeLibGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
}

function normalizeOptions(tree: Tree, options: MfeLibGeneratorSchema): NormalizedSchema {
  const mfeNameFileName = names(options.mfeName).fileName; // harbor
  const name = names(options.type).fileName; // data-access
  options.name = name;

  const projectDirectory = `mfe/${mfeNameFileName}`;
  options.directory = projectDirectory;

  const root = `${projectDirectory}/${name}`;

  const projectName = root.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${root}`;

  options.changeDetection = 'OnPush';
  options.scope = 'mfe';
  options.tags = `scope:${options.scope},mfeName:${mfeNameFileName},type:${options.type},framework:angular`;

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
    mfeNameClassName: names(options.mfeName).className,
    scopeFileName: names(options.scope).fileName,
    mfeNameFileName: names(options.mfeName).fileName,
    ...names(options.mfeName),
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
