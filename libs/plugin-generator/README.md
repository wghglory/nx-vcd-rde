# plugin-generator

```bash
npm install @nx/plugin -D
npx nx generate @nx/plugin:plugin plugin-generator
```

## Set plugin as default collection

Add below in `nx.json`:

```
"cli": {
  "defaultCollection": "@seed/plugin-generator"
},
```

So now instead of `npx nx generate @seed/plugin-generator:plugin-generator <a-custom-library-name>`, you can simply run `npx nx g plugin-generator <a-custom-library-name>`

## Create a new generator by a generator

```bash
npx nx generate @nx/plugin:generator angular-library --project=plugin-generator
```

It will create a new `angular-library` generator.

Build own generator by modifying the official generator [schema.json](https://github.com/nrwl/nx/blob/master/packages/angular/src/generators/library/schema.json) and [schema.d.ts](https://github.com/nrwl/nx/blob/master/packages/angular/src/generators/library/schema.d.ts).

## Building

Run `nx build plugin-generator` to build the library.

## Running unit tests

Run `nx test plugin-generator` to execute the unit tests via [Jest](https://jestjs.io).

## Reference

- <https://dev.to/this-is-learning/create-own-default-plugin-to-nx-workspace-2fen>
- [EJS template variable is not defined](https://stackoverflow.com/questions/31776471/ejs-template-variable-is-not-defined-on-page-load-and-errors)
