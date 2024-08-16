import { Tree } from '@nx/devkit';

import generateAngularLib from '../angular-library/generator';
import generateTypescriptLib from '../typescript-library/generator';
import { AngularGeneratorType, TypescriptGeneratorType } from '../../generator.model';
import { AllLibrariesGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AllLibrariesGeneratorSchema) {
  const angularTypes: AngularGeneratorType[] = ['feature', 'data-access', 'ui'];
  const typescriptTypes: TypescriptGeneratorType[] = ['model', 'util'];

  for (const type of angularTypes) {
    await generateAngularLib(tree, { ...options, type, name: type });
  }
  for (const type of typescriptTypes) {
    await generateTypescriptLib(tree, { ...options, type });
  }
}
