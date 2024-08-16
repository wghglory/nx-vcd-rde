import { Tree, formatFiles, installPackagesTask, names, generateFiles, joinPathFragments } from '@nx/devkit';
import { libraryGenerator } from '@nx/workspace/generators';

interface NewArticleSchemaOptions {
  title: string;
  author: string;
  excerpt?: string;
}

export default async function (tree: Tree, schema: NewArticleSchemaOptions) {
  // await libraryGenerator(tree, { name: schema.name });

  generateFiles(
    // virtual file system
    tree,

    // the location where the template files are
    joinPathFragments(__dirname, './files'),

    // where the files should be generated
    './_articles',

    // the variables to be substituted in the template
    {
      title: schema.title,
      author: schema.author,
      excerpt: schema.excerpt || '',
      normalizedTitle: names(schema.title).fileName,
      creationDate: new Date().toISOString(),
    },
  );

  await formatFiles(tree);

  // return () => {
  //   installPackagesTask(tree);
  // };
}
