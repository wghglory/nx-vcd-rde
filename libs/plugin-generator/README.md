# plugin-generator

```bash
npm install @nrwl/nx-plugin -D
npx nx generate @nrwl/nx-plugin:plugin plugin-generator
```

## Set plugin as default collection

Add below in `nx.json`:

```
"cli": {
  "defaultCollection": "@seed/plugin-generator"
},
```

So now instead of `npx nx generate @seed/plugin-generator:plugin-generator <a-custom-library-name>`, you can simply run `npx nx g plugin-generator <a-custom-library-name>`

## Building

Run `nx build plugin-generator` to build the library.

## Running unit tests

Run `nx test plugin-generator` to execute the unit tests via [Jest](https://jestjs.io).
