import { formatFiles, names, Tree } from '@nrwl/devkit';
import { readFile, readFileSync, unlink, writeFile, writeFileSync } from 'fs';

import generateAngularLib from '../ng-lib/generator';
import generateTypescriptLib from '../ts-lib/generator';
import { appRoute, navbarHtml } from './../generator.const';
import { AngularGeneratorType, TypescriptGeneratorType } from './../generator.model';
import { AllLibGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AllLibGeneratorSchema) {
  const angularTypes: AngularGeneratorType[] = ['feature', 'data-access', 'ui'];
  const typescriptTypes: TypescriptGeneratorType[] = ['model', 'util'];

  // feature --directory=mfe --domain=book --mfeName=ose --scope=mfe --type=feature
  for (const type of angularTypes) {
    await generateAngularLib(tree, { ...options, type, name: type });
  }
  for (const type of typescriptTypes) {
    await generateTypescriptLib(tree, { ...options, type, name: type });
  }

  await formatFiles(tree);

  return () => {
    modifyFile(
      navbarHtml,
      '<!--INJECTION_POINT_DO_NOT_DELETE-->',
      `<a routerLink="/${options.directory}/${names(options.domain).fileName}" routerLinkActive="active" class="nav-link">
      <span class="nav-text">${names(options.domain).className}</span>
    </a>
    `,
    );

    modifyFile(
      appRoute,
      '// <!--INJECTION_POINT_DO_NOT_DELETE-->',
      `{
    path: '${options.directory}/${names(options.domain).fileName}',
    loadChildren: () => import('@seed/${options.directory}/${names(options.domain).fileName}/feature').then(m => m.${
        names(options.directory).className
      }${names(options.domain).className}FeatureModule),
    data: { layout },
  },
  `,
    );
  };
}

function modifyFile(filePath: string, injectPlaceholder: string, insertedText: string) {
  const content = readFileSync(filePath, 'utf8');

  const insertPoint = content.indexOf(injectPlaceholder);

  const updatedText = `${content.slice(0, insertPoint)}${insertedText}${content.slice(insertPoint)}`;

  writeFileSync(filePath, updatedText);

  console.log(`${filePath} updated.`);
}
