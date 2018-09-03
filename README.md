# CH1 Utility

[![CircleCI](https://circleci.com/gh/bennett000/ch1-utility.svg?style=svg)](https://circleci.com/gh/bennett000/ch1-utility)

_This is not well maintained_

[_This library ships as Closure Compiler compatible JavaScript, Beware_](https://gist.github.com/bennett000/a26dfc8cf15e5d97139e41b0711f3fe0#file-the-case-for-shipping-ts-as-ts-md 'Why Ship TS as TS')

## Installation

`yarn add @ch1/utility`

## Interfaces

- `Dictionary<T>`

## Functions

- `createBetween` `(random: () => number) => () => number`
- `identity`
- `isFunction`
- `isNaN`
- `isNumber`
- `isNull`
- `isObject`
- `isString`
- `isUndefined`
- `noop`

```ts
const between = createBetween(Math.random.bind(Math));
const randomNumber = between(0, 100); // inclusive due to Math.random
```

## License

[LGPL](./LICENSE 'Lesser GNU Public License')
