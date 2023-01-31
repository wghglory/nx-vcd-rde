import { getBrowserCultureLang, LocaleService, PatternCategories, VIPService } from '@vmw/ngx-vip';

import { ENGLISH as AppEng } from './app.l10n';
import { ENGLISH as CoreEng } from './core.l10n';

// VIP
export function initVIPConfig(vipService: VIPService, localeService: LocaleService) {
  return () => {
    // Specify locale, either from browser language or user's profile.
    localeService.init(getBrowserCultureLang());

    vipService.initData({
      productID: 'oss',
      component: 'AngularClient',
      version: '1.0.0',
      host: '/',
      isPseudo: true,
      i18nScope: [
        PatternCategories.DATE,
        PatternCategories.NUMBER,
        PatternCategories.PLURAL,
        PatternCategories.CURRENCIES,
      ],
      collectSource: false,
      sourceBundles: [AppEng, CoreEng],
    });
  };
}
