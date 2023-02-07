import { getBrowserCultureLang, LocaleService, PatternCategories, VIPService } from '@vmw/ngx-vip';

import { ENGLISH as AppEng } from './app.l10n';
import { ENGLISH as CoreEng } from './core.l10n';

// VIP
export function initVIPConfig(vipService: VIPService, localeService: LocaleService) {
  return () => {
    // Specify locale, either from browser language or user's profile.
    localeService.init(getBrowserCultureLang());

    vipService.initData({
      productID: process.env['NX_VIP_PRODUCT_ID'] || 'seed',
      component: 'AngularClient',
      version: process.env['NX_VIP_VERSION'] || '0.0.1',
      host: process.env['NX_VIP_HOST'] || '/',
      isPseudo: process.env['NX_VIP_ISPSEUDO'] === 'true',
      i18nScope: [PatternCategories.DATE, PatternCategories.NUMBER, PatternCategories.PLURAL, PatternCategories.CURRENCIES],
      collectSource: process.env['NX_VIP_COLLECT_SOURCE'] === 'true',
      sourceBundles: [AppEng, CoreEng],
    });
  };
}
