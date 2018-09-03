/** assumes number is between 0 - 1 inclusive of 0 but not 1 */
export function createBetween(random: () => number) {
  return (minimum: number, maximum: number) => {
    const min = Math.ceil(minimum);
    const max = Math.floor(maximum);
    return Math.floor(random() * (max - min)) + min;
  };
}

export function identity<T>(thing: T): T {
  return thing;
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
