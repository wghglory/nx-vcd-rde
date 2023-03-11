import { Tree } from '@nrwl/devkit';

import generateAngularLib from '../angular-library-advanced/generator';
import { MfeLibGeneratorSchema } from './schema';

export default async function (tree: Tree, options: MfeLibGeneratorSchema) {
  // npx nx generate @seed/plugin-generator:angular-library-advanced feature --scope=mfe --type=feature --directory=mfe/harbor --domain=harbor
  await generateAngularLib(tree, { ...options, scope: 'mfe', directory: `mfe/${options.domain}` });
}
