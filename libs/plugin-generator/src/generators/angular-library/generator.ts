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
  const { libsDir } = getWorkspaceLayout(tree);
  const name = names(options.name).fileName;
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name;
  const projectRoot = joinPathFragments(libsDir, projectDirectory);
  const libraryName = options.directory ? `${options.directory}-${options.name}` : options.name;

  const tags = `project:${options.domain},scope:${options.scope},type:${options.type},framework:angular`;

  // console.log(libsDir); // libs
  // console.log(name); // book
  // console.log(projectDirectory); // provider/book
  // console.log(projectRoot); // libs/provider/book
  // console.log(libraryName); // provider-book

  // run the original generator
  await libraryGenerator(tree, { ...options, tags });

  // const libraryRoot = readProjectConfiguration(tree, libraryName);

  // https://nx.dev/packages/devkit/documents/index#offsetfromroot
  const relativeOffset = offsetFromRoot(projectRoot); // ../../../

  // Add own custom files
  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates)
    projectRoot, // destination path of the files
    { ...options, projectRoot, libraryName, relativeOffset, ...names(options.name), template: '' }, // config object to replace variable in file templates
  );

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
