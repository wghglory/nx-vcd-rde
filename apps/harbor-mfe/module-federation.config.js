module.exports = {
  name: 'harbor-mfe',
  exposes: {
    './Module': 'apps/harbor-mfe/src/app/remote-entry/entry.module.ts',
  },
};
