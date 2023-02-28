// Shared Nx module configuration
// see https://nx.dev/module-federation/micro-frontend-architecture#micro-frontend-architecture

// --------------------------------------------------------------------------------------------
// sharedPackages are shared as singletons between MFE apps.
// All other npm packages and workspace libraries are not shared to minimize mismatch errors.
// TODO: revisit this list!
const sharedNpmPackages = new Set([
  '@angular/animations',
  '@angular/cdk',
  '@angular/common',
  '@angular/common/http',
  '@angular/core',
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/router',
  '@cds/core',
  '@clr/angular',
  '@clr/ui',
  '@ngrx/component-store',
  '@ngrx/effects',
  '@ngrx/entity',
  '@ngrx/router-store',
  '@ngrx/store',
  '@vmw/ngx-utils',
  '@vmw/ngx-vip',
  'lodash',
  'ngx-infinite-scroll',
  'ngx-pipes',
  'parse-url',
  'rxjs',
]);

// this is important because remote and host apps will share the singleton instance, so AuthService currentUser$ is sharable.
const sharedLibraries = new Set([
  '@seed/shared/models',
  '@seed/shared/modules',
  '@seed/shared/services',
  '@seed/shared/styles',
  '@seed/shared/ui',
  '@seed/shared/utils',
  '@seed/shared/vip',
  '@seed/core/interceptors',
]);

// --------------------------------------------------------------------------------------------

module.exports = {
  shared: (libraryName, defaultConfig) => {
    if (sharedNpmPackages.has(libraryName)) {
      // Nx defaultConfig is:
      //  "singleton": true,
      //  "strictVersion": true,
      //  "requiredVersion": <version installed>
      return defaultConfig;
    } else if (sharedLibraries.has(libraryName)) {
      return {
        singleton: true,
        requiredVersion: false,
      };
    }

    // Returning false means the library is not shared.
    return false;
  },
};
