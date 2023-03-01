import { Tree } from '@nrwl/devkit';

import generateAngularLib from '../angular-library/generator';
import generateTypescriptLib from '../typescript-library/generator';
import { AllLibrariesGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AllLibrariesGeneratorSchema) {
  await generateAngularLib(tree, { ...options, type: 'feature', name: 'feature' });
  await generateAngularLib(tree, { ...options, type: 'data-access', name: 'data-access' });
  await generateAngularLib(tree, { ...options, type: 'ui', name: 'ui' });

  await generateTypescriptLib(tree, { ...options, type: 'model' });
  await generateTypescriptLib(tree, { ...options, type: 'util' });
}
