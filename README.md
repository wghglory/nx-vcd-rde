# Seed

## Generate axe and lighthouse reports

```shell
npm run axe.save http://localhost:4200
npm run lighthouse.save http://localhost:4200
```

vpat folder will be created. Use these commands after finishing the development. Fixing issues.

## Generate CRUD

- UI: `npx nx generate @seed/plugin-generator:all-libraries --domain=book --scope=feature --no-interactive`
- Mock: `npx hygen route new` and type the domain name, e.g. book.

## Generate MFE

```shell
# add remote app
npx nx g @nrwl/angular:remote shop-mfe --host=seed
```

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

## Development server

Run `nx serve seed` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

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
1. [x] - UT
1. [x] - Cypress
1. [x] - Schematics
1. [x] - a11y
1. [ ] - upgrade clarity, ngx
1. [x] - dark mode, tailwind.
1. [ ] Generate json-schema by ts: https://github.com/YousefED/typescript-json-schema and https://github.com/vega/ts-json-schema-generator. Generate mock by json-schema
1. [ ] MFE generator

## Issues

- Tailwind not working in remote app. https://github.com/nrwl/nx/issues/9784
- how to pass user session in standalone remote app?

## Common Dev Errors

### Import all components in barrel index due to the limitations of micro frontend.

```
core.mjs:8506

       ERROR Error: Uncaught (in promise): TypeError: Cannot read properties of undefined (reading 'ɵcmp')
TypeError: Cannot read properties of undefined (reading 'ɵcmp')
    at getComponentDef (core.mjs:1240:16)
```

e.g. `export * from './alert/alert.component';` although it is exported from the alert module.

### Shared Service Data issue

StudentService shared the selected student, but if navigating to other routes and come back, the selected student still exists as the service is not destroyed. Thus, Delete button is still enabled without selecting any student in UI.
