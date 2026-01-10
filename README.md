# CH1 Utility

[![CircleCI](https://circleci.com/gh/bennett000/ch1-utility.svg?style=svg)](https://circleci.com/gh/bennett000/ch1-utility)

_This is not well maintained_

## Installation

`yarn add @ch1/utility`

## Interfaces

- `Dictionary<T>`

## Types

- `DeepReadonly<T>`

## Constants

- `EPSILON` - `0.00001`

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
- `objEach`
- `objFilter`
- `objReduce`
- `partial`
- `pluck`
- `toGtZeroIntMax`
- `toInt`
- `toIntArray`
- `toIntArrayMax`
- `toIntArrayMin`
- `toIntBetween`
- `toIntBetweenOptional`
- `toIntMax`
- `toIntMin`
- `toString`
- `toStringArray`
- `toStringArrayMax`
- `toStringMax`
- `unzip`
- `zip`
- `betweenInt` `(rando: () => number, min: number, max: number) => number`
- `isCloseToZero` `(a: number, epsilon?: number) => boolean`
- `isValueCloseToTarget` `(value: number, target: number, epsilon?: number) => boolean`

```ts
const between = createBetween(Math.random.bind(Math));
const randomNumber = between(0, 100); // inclusive due to Math.random
```

## License

[LGPL](./LICENSE 'Lesser GNU Public License')
