# Seed

## Generate axe and lighthouse reports

```shell
npm run axe.save http://localhost:4200
npm run lighthouse.save http://localhost:4200
```

vpat folder will be created. Use these commands after finishing the development. Fixing issues.

## How to generate this repo?

1. npx create-nx-workspace@15.6.1
2. repository name: seed; application name: seed
3. add clarity
4. generate tailwind
5. add `@nrwl/express`, and generate api express server
6. generate shared models: `nx generate @nrwl/workspace:library models --skipBabelrc --directory=shared  --no-standaloneConfig --testEnvironment=node --unitTestRunner=none`
7. generate feature lib: `npx nx generate @nrwl/angular:library product --style=scss --directory=feature --changeDetection=OnPush --inlineStyle --lazy --routing --standalone`

## What's included?

- clarity ng 15
- tailwind
- express mock server

## For what?

- POC
- Reproduce issues
- Use this basic template to create advanced templates

## TODO after download this template

Replace seed to your project name.

- [ ] Jest setup

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Development server

Run `nx serve seed` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Structure (TODO)

```
Shared Libraries:

- shared/model: nrwl library
- shared/module: angular library
- shared/data-access: angular library, authService authGuard
- shared/ui: angular library
- shared/pipe： angular library
- shared/directive： angular library
- shared/validator: angular library
- shared/util: nrwl library

Core Libraries:

- core/ui: nav, login, about which used only once
- core/interceptor

rde Library

common-assets Library: images, svg, etc

Feature Libraries:

- provider/

  - feature1 (library)
    - models
    - utils
    - services
    - ui

  - feature2 (library)
    - models
    - utils
    - services
    - ui

- tenant/
```

## TODOS

1. [x] - Display a welcome page (Shared ui) for both provider and tenant. Wire route for home page.
   1. `npx nx generate @nrwl/angular:component welcome --project=shared-ui --changeDetection=OnPush --standalone --no-interactive`
1. [ ] - UT
1. [ ] - Cypress
1. [ ] - Schematics
1. [ ] - a11y
1. [ ] - upgrade clarity, ngx
1. [x] - dark mode, tailwind.

## Generate MFE

```shell
# add remote app
npx nx g @nrwl/angular:remote shop-mfe --host=seed
```
