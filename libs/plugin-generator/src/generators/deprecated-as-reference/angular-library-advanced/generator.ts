import { libraryGenerator } from '@nrwl/angular/generators';
import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  installPackagesTask,
  joinPathFragments,
  names,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';

import { AngularLibraryGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AngularLibraryGeneratorSchema) {
  const { libsDir } = getWorkspaceLayout(tree); // libs | apps
  const name = names(options.name).fileName; // library name: book
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name; // provider/book
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-'); // provider-book
  const projectRoot = joinPathFragments(libsDir, projectDirectory); // libs/provider/book
  const domain = options.domain || name;
  // const directory = `${options.scope}/${options.domain}/${options.type}`; // shared/products/ui

  options.domain = domain;
  options.tags = `scope:${options.scope},domain:${domain},type:${options.type},framework:angular`;
  options.changeDetection = 'OnPush';
  // options.importPath = `@seed/${directory}/${options.name}`; // add path in tsconfig.base.json

  // console.log(libsDir); // libs
  // console.log(name); // book
  // console.log(projectDirectory); // provider/book
  // console.log(projectName); // provider-book
  // console.log(projectRoot); // libs/provider/book

  // run the original generator
  await libraryGenerator(tree, { ...options });

  // const libraryRoot = readProjectConfiguration(tree, projectName);

  // https://nx.dev/packages/devkit/documents/index#offsetfromroot

  // Add own custom files
  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates)
    projectRoot, // destination path of the files
    { ...options, projectRoot, projectName, offsetFromRoot: offsetFromRoot(projectRoot), ...names(options.name), template: '' }, // config object to replace variable in file templates
  );

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
