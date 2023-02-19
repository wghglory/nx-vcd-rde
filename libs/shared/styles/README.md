# Styles

This is Angular library for web

type: ui
scope: shared-style

## Use scss in other libs

configure below in seed project project.json `build` options:

```
"stylePreprocessorOptions": {
  "includePaths": ["libs/shared/styles/src/lib/scss"]
},
```

consume scss in any lib:

```scss
@import 'colors';
```
