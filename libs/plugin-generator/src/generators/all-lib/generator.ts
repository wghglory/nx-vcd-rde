import { formatFiles, names, Tree } from '@nrwl/devkit';
import { readFile, unlink, writeFile } from 'fs';

import generateAngularLib from '../ng-lib/generator';
import generateTypescriptLib from '../ts-lib/generator';
import { appRoute, navbarHtml } from './../generator.const';
import { AngularGeneratorType, TypescriptGeneratorType } from './../generator.model';
import { AllLibGeneratorSchema } from './schema';

export default async function (tree: Tree, options: AllLibGeneratorSchema) {
  const angularTypes: AngularGeneratorType[] = ['feature', 'data-access', 'ui'];
  const typescriptTypes: TypescriptGeneratorType[] = ['model', 'util'];

  // // feature --directory=mfe --domain=book --mfeName=ose --scope=mfe --type=feature
  // for (const type of angularTypes) {
  //   await generateAngularLib(tree, { ...options, type, name: type });
  // }
  // for (const type of typescriptTypes) {
  //   await generateTypescriptLib(tree, { ...options, type, name: type });
  // }

  modifyFiles(options);

  await formatFiles(tree);
}

function modifyFiles(options: AllLibGeneratorSchema) {
  // create router link in navbar
  readFile(navbarHtml, 'utf8', (err, text) => {
    if (err) throw err;

    const insertPoint = text.indexOf('<!--INJECTION_POINT_DO_NOT_DELETE-->');

    const link = `<a routerLink="/${options.directory}/${names(options.domain).fileName}" routerLinkActive="active" class="nav-link">
      <span class="nav-text">${names(options.domain).className}</span>
    </a>
    `;

    const updatedText = `${text.slice(0, insertPoint)}${link}${text.slice(insertPoint)}`;

    // Write the modified content back to the file
    writeFile(navbarHtml, updatedText, err => {
      if (err) throw err;
      console.log(`${navbarHtml} updated.`);
    });
  });

  readFile(appRoute, 'utf8', (err, html) => {
    if (err) throw err;

    const insertPoint = html.indexOf('// <!--INJECTION_POINT_DO_NOT_DELETE-->');

    const link = `{
    path: '${names(options.domain).fileName}',
    loadChildren: () => import('@seed/${options.directory}/${names(options.domain).fileName}/feature').then(m => m.${
      names(options.directory).className
    }${names(options.domain).className}FeatureModule),
    data: { layout },
  },
  `;

    const updatedText = `${html.slice(0, insertPoint)}${link}${html.slice(insertPoint)}`;

    // Write the modified content back to the file
    writeFile(appRoute, updatedText, err => {
      if (err) throw err;
      console.log('----- app.routes.ts file has been updated. -----');
    });
  });
}
