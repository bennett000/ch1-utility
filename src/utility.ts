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

/**
 * Creates a function that generates random integers within a range.
 *
 * @param random - Random number generator returning values in [0, 1).
 *                 Values outside this range will produce incorrect results.
 * @returns A function that takes (minimum, maximum) and returns a random integer
 *          in range [ceil(minimum), floor(maximum))
 * @throws {Error} If minimum or maximum is NaN
 * @throws {Error} If ceil(minimum) >= floor(maximum)
 */
export function createBetween(random: () => number) {
  return (minimum: number, maximum: number) => {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    if (Number.isNaN(min) || Number.isNaN(max)) {
      throw new Error('min and max must be valid numbers');
    }
    if (min >= max) {
      throw new Error('minimum must be less than maximum');
    }
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
): T | false {
  const lProp = prop.toLowerCase();
  return objReduce(
    obj,
    (result: T | false, el: T, objProp: string) => {
      if (result) {
        return result;
      }

      if (lProp === objProp.toLowerCase()) {
        return el;
      }

      return false;
    },
    false as T | false
  );
}

export function hasProp(prop: string, haystack: Dictionary<unknown>): boolean {
  return haystack[prop] ? true : false;
}

export function isBoolean(arg: unknown): arg is boolean {
  return typeof arg === 'boolean';
}

/**
 * Type guard that checks if a value is a function.
 *
 * Note: This returns true for all callable values including arrow functions,
 * regular functions, class constructors, async functions, and generators.
 *
 * @param thing - Value to check
 * @returns True if thing is a function
 */
export function isFunction(thing: unknown): thing is (...args: unknown[]) => unknown {
  return typeof thing === 'function';
}

/**
 * Checks if a value is NaN using the self-inequality property (NaN !== NaN).
 *
 * Note: This function shadows the global isNaN. Unlike Number.isNaN(),
 * this only returns true for NaN values, not for non-numeric values.
 *
 * @param thing - Value to check
 * @returns True if thing is NaN
 */
export function isNaN(thing: unknown): boolean {
  return thing !== thing;
}

export function isNull(thing: unknown): thing is null {
  return thing === null;
}

export function isNumber(thing: unknown): thing is number {
  return typeof thing === 'number';
}

/**
 * Type guard that checks if a value is an object.
 *
 * Note: This returns true for arrays, Date objects, RegExp, and other
 * object types. It correctly returns false for null.
 * Use Array.isArray() if you need to specifically exclude arrays.
 *
 * @param thing - Value to check
 * @returns True if thing is a non-null object (including arrays)
 */
export function isObject(thing: unknown): thing is Record<string, unknown> {
  if (!thing) {
    return false;
  }
  return typeof thing === 'object';
}

export function isString(thing: unknown): thing is string {
  return typeof thing === 'string';
}

export function isUndefined(thing: unknown): thing is undefined {
  return thing === undefined;
}

/**
 * A no-operation function that does nothing.
 * Useful as a default callback or placeholder.
 */
export function noop(): void {}

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

/**
 * Default epsilon for floating point comparisons.
 */
export const EPSILON = 0.00001;

/**
 * Checks if a number is close to zero within epsilon tolerance.
 *
 * @param a - Number to check
 * @param epsilon - Tolerance (default 0.00001)
 * @returns True if |a| < epsilon
 * @throws {Error} If epsilon is not a positive number
 */
export function isCloseToZero(a: number, epsilon = EPSILON): boolean {
  if (epsilon <= 0 || Number.isNaN(epsilon)) {
    throw new Error('epsilon must be a positive number');
  }
  return Math.abs(a) < epsilon;
}

/**
 * Checks if two numbers are close to each other within epsilon tolerance.
 *
 * @param value - First number
 * @param target - Second number
 * @param epsilon - Tolerance (default 0.00001)
 * @returns True if |value - target| < epsilon
 * @throws {Error} If epsilon is not a positive number
 */
export function isValueCloseToTarget(
  value: number,
  target: number,
  epsilon = EPSILON
): boolean {
  if (epsilon <= 0 || Number.isNaN(epsilon)) {
    throw new Error('epsilon must be a positive number');
  }
  return Math.abs(value - target) < epsilon;
}

/**
 * Generates a random integer between min (inclusive) and max (exclusive).
 *
 * @param rando - Random number generator function returning values in [0, 1).
 *                Values outside this range will produce incorrect results.
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns Random integer in range [ceil(min), floor(max))
 * @throws {Error} If min or max is NaN
 * @throws {Error} If ceil(min) >= floor(max)
 */
export function betweenInt(
  rando: () => number,
  min: number,
  max: number
): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  if (Number.isNaN(minCeiled) || Number.isNaN(maxFloored)) {
    throw new Error('min and max must be valid numbers');
  }
  if (minCeiled >= maxFloored) {
    throw new Error('ceil(min) must be less than floor(max)');
  }
  return Math.floor(rando() * (maxFloored - minCeiled) + minCeiled);
}
