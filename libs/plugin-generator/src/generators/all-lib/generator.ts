import { Tree } from '@nrwl/devkit';

import generateAngularLib from '../ng-lib/generator';
import { AngularGeneratorType, TypescriptGeneratorType } from './../generator.model';
import { AllLibGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AllLibGeneratorSchema) {
  const angularTypes: AngularGeneratorType[] = ['feature', 'data-access', 'ui'];
  const typescriptTypes: TypescriptGeneratorType[] = ['model', 'util'];

  // feature --directory=mfe --domain=book --mfeName=ose --scope=mfe --type=feature
  for (const type of angularTypes) {
    await generateAngularLib(tree, { ...options, type, name: type });
  }
}
