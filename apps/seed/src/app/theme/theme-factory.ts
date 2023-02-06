import { VmwClarityThemeConfig, VmwClarityThemeService } from '@vmw/ngx-utils';

export function themeFactory(themeService: VmwClarityThemeService) {
  // Optional config object to be passed to initialize() call
  const config = {
    clarityDarkPath: '/assets/css/clr-ui-dark.min.css',
    clarityLightPath: '/assets/css/clr-ui.min.css',
    cookieName: 'clarity-theme',
    darkBodyClasses: ['fade-to-dark', 'dark'],
    cookieDomain: 'vmware.com',
    useBrowserDefault: true,
  } as VmwClarityThemeConfig;

  return () => {
    return new Promise((resolve, reject) => {
      themeService.initialize(config).then(() => {
        resolve(config);
      });
    });
  };
}
