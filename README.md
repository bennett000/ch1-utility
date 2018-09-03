# CH1 Utility

_This is not well maintained_

[_This library ships as TypeScript, Beware_](https://gist.github.com/bennett000/a26dfc8cf15e5d97139e41b0711f3fe0#file-the-case-for-shipping-ts-as-ts-md 'Why Ship TS as TS')

## Installation

`yarn add @ch1/utility`

## Interfaces

- `Dictionary<T>`

## Functions

- `noop`
- `createBetween` `(random: () => number) => () => number`

```ts
const between = createBetween(Math.random.bind(Math));
const randomNumber = between(0, 100); // inclusive due to Math.random
```

## License

[LGPL](./LICENSE 'Lesser GNU Public License')
