#! /bin/bash -e

tsc -t es5 --lib 'es2016','DOM'  node_modules/@vmw/ngx-vip/cli/collect-mixin-source.ts

sed -i "/let l10nFilePath.*'\.ts'/s/ts/js/" node_modules/@vmw/ngx-vip/cli/collect-mixin-source.js

find src -name *.l10n.ts -exec tsc {} \;
