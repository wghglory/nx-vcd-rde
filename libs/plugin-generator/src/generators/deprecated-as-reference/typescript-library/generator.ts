// npx nx generate @seed/plugin-generator:typescript-library --domain=bookStore --scope=provider --type=model --no-interactive --dry-run
import { formatFiles, generateFiles, getWorkspaceLayout, names, offsetFromRoot, Tree, updateJson } from '@nx/devkit';
import * as path from 'path';

import { TypescriptLibraryGeneratorSchema } from './schema';

interface NormalizedSchema extends TypescriptLibraryGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  tags: string[];
  // names function return below
  name?: string;
  className?: string;
  propertyName?: string;
  constantName?: string;
  fileName?: string;

  optionalFileName: string;
}

/**
 * cli inputs
  1. domain: 'book',
     scope: 'core',
     type: 'util',

  2. scope: 'core',
     type: 'util',
 * @param tree virtual file system
 * @param options
  1. projectDirectory: 'core/book',
  1. projectName: 'core-book-util',
  1. projectRoot: 'libs/core/book/util',
  1. tags: 'scope:core,domain:book,type:util',
  1. name: 'book',
  1. className: 'Book',
  1. propertyName: 'book',
  1. constantName: 'BOOK',
  1. fileName: 'book'

  2. projectDirectory: 'core',
  2. projectName: 'core-util',
  2. projectRoot: 'libs/core/util',
  2. tags: 'scope:core,type:util',
 * @returns
 */
function normalizeOptions(tree: Tree, options: TypescriptLibraryGeneratorSchema): NormalizedSchema {
  let projectDirectory, projectName, projectRoot, tags;

  if (options.domain) {
    const domainNames = names(options.domain);
    projectDirectory = `${options.scope}/${domainNames.fileName}`;
    projectName = `${projectDirectory.replace(new RegExp('/', 'g'), '-')}-${options.type}`;
    projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}/${options.type}`;
    tags = [`"scope:${options.scope}"`, `"domain:${domainNames.fileName}"`, `"type:${options.type}"`];

    return {
      ...options,
      projectName,
      projectRoot,
      projectDirectory,
      tags,
      ...domainNames,
      optionalFileName: domainNames.fileName + '.',
    };
  } else {
    projectDirectory = `${options.scope}`;
    projectName = `${projectDirectory.replace(new RegExp('/', 'g'), '-')}-${options.type}`;
    projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}/${options.type}`;
    tags = [`"scope:${options.scope}"`, `"type:${options.type}"`];

    return {
      ...options,
      projectName,
      projectRoot,
      projectDirectory,
      tags,
      optionalFileName: '',
    };
  }
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

function modifyJsonFiles(tree: Tree, options: NormalizedSchema) {
  // Add entry to tsconfig.base.json
  updateJson(tree, 'tsconfig.base.json', configJson => {
    configJson.compilerOptions.paths[`@seed/${options.projectDirectory}/${options.type}`] = [`${options.projectRoot}/src/index.ts`];
    // return modified JSON object
    return configJson;
  });
}

export default async function (tree: Tree, options: TypescriptLibraryGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  // console.log(normalizedOptions);

  addFiles(tree, normalizedOptions);

  modifyJsonFiles(tree, normalizedOptions);

  await formatFiles(tree);
}
