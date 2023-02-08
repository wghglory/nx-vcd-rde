import { libraryGenerator } from '@nrwl/angular/generators';
import { formatFiles, generateFiles, getWorkspaceLayout, joinPathFragments, names, Tree } from '@nrwl/devkit';

import { AngularLibraryGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AngularLibraryGeneratorSchema) {
  const { libsDir } = getWorkspaceLayout(tree);
  const name = names(options.name).fileName;
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name;
  const projectRoot = joinPathFragments(libsDir, projectDirectory);
  const tags = `project:${options.domain},scope:${options.scope},type:${options.type},framework:angular`;

  // run the original generator
  await libraryGenerator(tree, { ...options, tags });

  // Add own custom files
  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files'), // path to the file templates)
    projectRoot, // destination path of the files
    { ...options, ...names(options.name), template: '' }, // config object to replace variable in file templates
  );
  await formatFiles(tree);
}
