# Global Alert Message

```bash
npx nx generate @nx/angular:ngrx alerts --parent=libs/core/ui/src/lib/alert/alert.module.ts --module=libs/core/ui/src/lib/alert/alert.module.ts --no-interactive
```

## How to send alerts?

```ts
export class Component {
  constructor(private store: Store) {
    store.dispatch(
      alertActions.addAlert({
        alert: {
          id: Symbol(1),
          message: 'alert.support',
          alertKey: 'global',
        },
      }),
    );

    store.dispatch(
      alertActions.addAlert({
        alert: { type: 'success', message: 'alert.todayDesc', alertKey: 'global', params: ['Tuesday'] },
      }),
    );
  }
}
```

We can test it in `app.component.ts`.
