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

  const tags = `domain:${options.domain},scope:${options.scope},type:${options.type}`;
  // const importPath = `@seed/${options.scope}/${options.domain}/${options.name}`;
  // options.directory = `${options.scope}/${options.domain}/${options.type}`;

  // console.log(libsDir); // libs
  // console.log(options.directory); // feature
  // console.log(name); // mfe
  // console.log(projectDirectory); // feature/mfe
  // console.log(projectRoot); // libs/feature/mfe
  // console.log(libraryName); // feature-mfe

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
