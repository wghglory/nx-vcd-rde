// npx nx generate @seed/plugin-generator:typescript-library --domain=bookStore --scope=provider --type=model --no-interactive --dry-run

import { formatFiles, generateFiles, getWorkspaceLayout, names, offsetFromRoot, Tree, updateJson } from '@nrwl/devkit';
import * as path from 'path';

import { TypescriptLibraryGeneratorSchema } from './schema';

interface NormalizedSchema extends TypescriptLibraryGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  tags: string[];
  // names function return below
  name: string;
  className: string;
  propertyName: string;
  constantName: string;
  fileName: string;
}

/**
 * cli inputs
  // domain: 'book',
  // scope: 'core',
  // type: 'util',
 * @param tree virtual file system
 * @param options
    // projectDirectory: 'core/book',
    // projectName: 'core-book-util',
    // projectRoot: 'libs/core/book/util',
    // tags: 'scope:core,domain:book,type:util',
    // name: 'book',
    // className: 'Book',
    // propertyName: 'book',
    // constantName: 'BOOK',
    // fileName: 'book'
 * @returns
 */
function normalizeOptions(tree: Tree, options: TypescriptLibraryGeneratorSchema): NormalizedSchema {
  const domainNames = names(options.domain);
  const projectDirectory = `${options.scope}/${domainNames.fileName}`;
  const projectName = `${projectDirectory.replace(new RegExp('/', 'g'), '-')}-${options.type}`;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}/${options.type}`;
  const tags = [`"scope:${options.scope}"`, `"domain:${domainNames.fileName}"`, `"type:${options.type}"`];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    tags,
    ...domainNames,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    relativeOffset: offsetFromRoot(options.projectRoot),
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
