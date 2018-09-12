# CH1 Utility

[![CircleCI](https://circleci.com/gh/bennett000/ch1-utility.svg?style=svg)](https://circleci.com/gh/bennett000/ch1-utility)

_This is not well maintained_

## Installation

`yarn add @ch1/utility`

## Interfaces

- `Dictionary<T>`

## Functions

- `arrToObj`
- `createBetween` `(random: () => number) => () => number`
- `deepFreeze`
- `findCaseInsensitivePropInObj`
- `hasProp`
- `isBoolean`
- `identity`
- `isFunction`
- `isNaN`
- `isNumber`
- `isNull`
- `isObject`
- `isString`
- `isUndefined`
- `noop`
- `partial`
- `pluck`
- `objEach`
- `objFilter`
- `objReduce`
- `toGtZeroIntMax`
- `toInt`
- `toIntBetweenOptional`
- `toIntMax`
- `toIntMin`
- `toString`
- `toStringMax`
- `unzip`
- `zip`

```ts
const between = createBetween(Math.random.bind(Math));
const randomNumber = between(0, 100); // inclusive due to Math.random
```

## License

[LGPL](./LICENSE 'Lesser GNU Public License')
