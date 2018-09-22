import { Dictionary } from './interfaces';

export function arrToObj<T>(
  arr: T[],
  prop?: string,
  aggregate?: boolean
): Dictionary<T> | Dictionary<T[]> {
  return arr.reduce(
    (state: Dictionary<T> | Dictionary<T[]>, el: T, i: number) => {
      let index;
      if (!prop) {
        index = i;
      } else {
        index = (<any>el)[prop];
      }
      if (aggregate) {
        if (!state[index]) {
          state[index] = <T[]>[];
        }
        (<any>state[index]).push(el);
      } else {
        state[index] = el;
      }
      return state;
    },
    {}
  );
}

/** assumes number is between 0 - 1 inclusive of 0 but not 1 */
export function createBetween(random: () => number) {
  return (minimum: number, maximum: number) => {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Math.floor(random() * (max - min)) + min;
  };
}

export function deepFreeze<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return (<any>Object).freeze(obj.map(deepFreeze)) as T;
  }

  if (isObject(obj)) {
    for (let i in obj) {
      if (isObject((<any>obj)[i])) {
        if (!Object.isFrozen((<any>obj)[i])) {
          (<any>obj)[i] = deepFreeze((<any>obj)[i]);
        }
      }
    }
  }

  return Object.freeze(obj) as T;
}

export function identity<T>(thing: T): T {
  return thing;
}

export function findCaseInsensitivePropInObj<T>(
  obj: Dictionary<T>,
  prop: string
): T | boolean {
  const lProp = prop.toLowerCase();
  return objReduce(
    obj,
    (obj: any, el: any, objProp: string) => {
      if (obj) {
        return obj;
      }

      if (lProp === objProp.toLowerCase()) {
        return el;
      }

      return false;
    },
    false
  );
}

export function hasProp(prop: string, haystack: Dictionary<any>): boolean {
  return haystack[prop] ? true : false;
}

export function isBoolean(arg: any): arg is boolean {
  if (typeof arg === 'boolean') {
    return true;
  }
  return false;
}

export function isFunction(thing: any): thing is (() => any) {
  return typeof thing === 'function';
}

export function isNaN(thing: any): boolean {
  return thing !== thing;
}

export function isNull(thing: any): thing is null {
  return thing === null;
}

export function isNumber(thing: any): thing is number {
  return typeof thing === 'number';
}

export function isObject(thing: any): thing is Object {
  if (!thing) {
    return false;
  }
  return typeof thing === 'object';
}

export function isString(thing: any): thing is string {
  return typeof thing === 'string';
}

export function isUndefined(thing: any): thing is void {
  return thing === undefined;
}

export function noop() {}

export function objEach<T>(
  d: Dictionary<T>,
  callback: (value: T, key?: string, index?: number, d?: Dictionary<T>) => any
) {
  Object.keys(d).forEach((key, i) => {
    callback(d[key], key, i, d);
  });
}

export function objFilter<T>(
  d: Dictionary<T>,
  callback: (value: T, key: string, index: number) => boolean
): Dictionary<T> {
  return objReduce(
    d,
    (state: Dictionary<T>, value: T, key: string, index: number) => {
      if (callback(value, key, index)) {
        state[key] = value;
      }
      return state;
    },
    {}
  );
}

export function objReduce<T, R>(
  d: Dictionary<T>,
  callback: (
    state: R,
    value: T,
    key: string,
    index: number,
    d: Dictionary<T>
  ) => R,
  init: R
): R {
  return Object.keys(d).reduce((state: R, key: string, i: number) => {
    return callback(state, d[key], key, i, d);
  }, init);
}

export function partial<T>(f: Function, ...boundArg: any[]) {
  return (...args: any[]) => <T>f(...boundArg, ...args);
}

export function pluck<T>(prop: string, haystack: Dictionary<T>) {
  return haystack[prop];
}

export function toGtZeroIntMax(max: number, val: any): number {
  const num = toInt(val);

  if (num > max) {
    return max;
  }

  if (num < 0) {
    return 0;
  }

  return num;
}

export function toInt(val: any): number {
  return parseInt(val, 10);
}

export function toIntArray(inputArr: any[]): number[] {
  if (Array.isArray(inputArr)) {
    return inputArr.map(toInt);
  }
  return [];
}

export function toIntArrayMax(max: number, inputArr: any[]): number[] {
  if (Array.isArray(inputArr)) {
    return inputArr.map(thing => toIntMax(max, thing)).filter(Boolean);
  }
  return [];
}

export function toIntArrayMin(max: number, inputArr: any[]): number[] {
  if (Array.isArray(inputArr)) {
    return inputArr.map(thing => toIntMin(max, thing)).filter(Boolean);
  }
  return [];
}

export function toIntBetween(min: number, max: number, val: any) {
  const asInt = toInt(val);

  if (asInt < min) {
    return min;
  }

  if (asInt > max) {
    return max;
  }

  return asInt;
}

export function toIntBetweenOptional(
  min: number | undefined,
  max: number | undefined,
  val: any
): number {
  if (min === undefined && max === undefined) {
    return toInt(val);
  }

  if (min === undefined && max !== undefined) {
    return toIntMax(max, val);
  }

  if (max === undefined && min !== undefined) {
    return toIntMin(min, val);
  }

  return toIntBetween(min as number, max as number, val);
}

export function toIntMax(max: number, val: any): number {
  const num = toInt(val);

  if (num > max) {
    return max;
  }

  return num;
}

export function toIntMin(min: number, val: any): number {
  const num = toInt(val);

  if (num < min) {
    return min;
  }

  return num;
}

export function toString(val: any): string {
  return val + '';
}

export function toStringArray(input: any[]): string[] {
  if (Array.isArray(input)) {
    return input.map(toString);
  }

  return [];
}

export function toStringArrayMax(max: number, input: any[]): string[] {
  if (Array.isArray(input)) {
    return input.map(thing => toStringMax(max, thing));
  }

  return [];
}

export function toStringMax(max: number, val: any): string {
  const v = toString(val);
  return v.length > max ? v.slice(0, max) : v;
}

export function unzip<T>(
  dictionary: Dictionary<T>
): { keys: string[]; values: T[] } {
  return Object.keys(dictionary).reduce(
    (s: { keys: string[]; values: T[] }, val: string) => {
      s.keys.push(val);
      s.values.push(dictionary[val]);

      return s;
    },
    {
      keys: [],
      values: []
    }
  );
}

/**
 *  If keys/values have different lengths the expect behavior is to "underflow"
 *  values.  Non values will be initialized to undefined. Non keys will be
 *  ignored.
 *
 *  If there are duplicate keys the last assignment "wins", this would be the
 *  key with the highest index in the given keys array
 */
export function zip<T>(keys: string[], values: T[]): Dictionary<T> {
  return keys.reduce((o: Dictionary<T>, key: string, i: number) => {
    o[key] = values[i];
    return o;
  }, {});
}
