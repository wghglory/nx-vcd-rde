import { formatFiles, generateFiles, getWorkspaceLayout, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';
import * as path from 'path';

import { TsLibGeneratorSchema } from './schema';

interface NormalizedSchema extends TsLibGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  entityFileName: string;
  entityClassName: string;
  entityPropertyName: string;
  names: (name: string) => {
    name: string;
    className: string;
    propertyName: string;
    constantName: string;
    fileName: string;
  };
}

function normalizeOptions(tree: Tree, options: TsLibGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;

  const directory = [];
  const tags = [`scope:${options.scope}`, `type:${options.type}`];
  let entityName = 'sample';

  if (options.directory) {
    directory.push(options.directory);
  }

  if (options.mfeName) {
    directory.push(options.mfeName);
    tags.push(`mfeName:${options.mfeName}`);
  }

  if (options.domain) {
    directory.push(options.domain);
    tags.push(`domain:${options.domain}`);
    entityName = options.domain;
  }

  const directoryWithoutName = directory.join('/');
  directory.push(name);

  // const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name;
  const projectDirectory = directory.join('/');
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;

  // Update options:
  options.tags = tags.join(', ');
  options.directory = directoryWithoutName;

  return {
    ...options,
    projectName, // mfe-ose-data-access
    projectRoot, // libs/mfe/ose/data-access
    projectDirectory, // mfe/ose/data-access
    entityFileName: names(entityName).fileName,
    entityClassName: names(entityName).className,
    entityPropertyName: names(entityName).propertyName,
    names,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  if (options.richTemplate) {
    generateFiles(tree, path.join(__dirname, options.type), options.projectRoot, templateOptions);
  } else {
    generateFiles(tree, path.join(__dirname, './files'), options.projectRoot, templateOptions);
  }
}

export default async function (tree: Tree, options: TsLibGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  await libraryGenerator(tree, { ...normalizedOptions });

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
