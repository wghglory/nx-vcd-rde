// https://javascript.plainenglish.io/how-to-build-generators-schematics-with-the-superior-nx-devkit-689d8f529fa6
import { Tree, formatFiles, generateFiles, getProjects, names, joinPathFragments } from '@nrwl/devkit';
import * as path from 'path';

export interface InterfaceSchema {
  name: string;
  projectName: string;
}

export default async function (tree: Tree, schema: InterfaceSchema) {
  // read project from project.json
  const project = getProjects(tree).get(schema.projectName);

  if (!project) {
    throw new Error(`Project ${schema.projectName} not exist`);
  }

  // generate interfaces into app/my-app-name/src/lib/models
  const targetPath = path.join(project.sourceRoot!, 'lib/models');

  // read templates from tools/generators/interface/files
  const templatePath = joinPathFragments(__dirname, './files');

  // generate different name variations for substitutions
  const interfaceNames = names(schema.name);

  const substitutions = {
    // remove __tmpl__ from file endings
    tmpl: '',
    // make the different name variants available as substitutions
    ...interfaceNames,
  };

  // generate the files from the templatePath into the targetPath
  generateFiles(tree, templatePath, targetPath, substitutions);

  // format all files which were created / updated in this schematic
  await formatFiles(tree);
}
