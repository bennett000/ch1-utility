import {
  arrToObj,
  createBetween,
  deepFreeze,
  identity,
  isFunction,
  isNumber,
  isObject,
  isNaN,
  isNull,
  isString,
  isUndefined,
  noop,
  partial,
  findCaseInsensitivePropInObj,
  hasProp,
  isBoolean,
  objEach,
  objFilter,
  pluck,
  toGtZeroIntMax,
  toIntArray,
  toIntArrayMax,
  toIntArrayMin,
  toIntBetween,
  toIntBetweenOptional,
  toString,
  toStringArray,
  toStringArrayMax,
  toStringMax,
  unzip,
  zip
} from './utility';

describe('utility functions', () => {
  describe('arrToObj', () => {
    it('literally converts an array to an Object dictionary', () => {
      const arr = ['a', 'b', 'c'];
      const obj = arrToObj(arr);
      expect(obj[0]).toBe('a');
      expect(obj[2]).toBe('c');
    });

    it('can use a given prop as an index', () => {
      const arr = [
        { id: 'foo', name: 'Ms. Foo' },
        { id: 'bar', name: 'Mr. Bar' },
        { id: 'baz', name: 'Dr. Baz' }
      ];
      const obj = arrToObj(arr, 'id');
      expect(obj.foo).toBe(arr[0]);
      expect(obj.bar).toBe(arr[1]);
      expect(obj.baz).toBe(arr[2]);
    });

    it(
      'can optionally aggregate duplicates on keys ' +
        'which is useless with literals',
      () => {
        const arr = ['a', 'b', 'a'];
        const obj = arrToObj(arr, undefined, true);
        expect(obj[0]).toEqual(['a']);
        expect(obj[1]).toEqual(['b']);
      }
    );

    it(
      'can optionally aggregate duplicates on keys ' +
        'which is useful with objects',
      () => {
        const arr = [{ id: 'a', value: 0 }, { id: 'a', value: 1 }];
        const obj = arrToObj(arr, 'id', true);
        expect(obj.a).toEqual([{ id: 'a', value: 0 }, { id: 'a', value: 1 }]);
      }
    );
  });

  describe('createBetween', () => {
    it('is inclusive of the minimum', () => {
      const between = createBetween(() => 0);
      expect(between(0, 100)).toBe(0);
    });

    it('is dependent on the given random function for max exclusivity', () => {
      const between = createBetween(() => 5);
      expect(between(0, 100)).toBe(500);
    });
  });

  describe('deepFreeze function', () => {
    it('should return an identity if given a non-object', () => {
      expect(deepFreeze(null)).toBe(null);
      expect(deepFreeze('hello')).toBe('hello');
      expect(deepFreeze(7)).toBe(7);
    });

    it('should freeze properties on an object', () => {
      const frozen = deepFreeze({
        a: 5,
        b: 'hello'
      });

      expect(() => ((<any>frozen).a = 23)).toThrowError();
      expect(() => ((<any>frozen).b = 23)).toThrowError();
    });

    it('should freeze object properties on an object', () => {
      const frozen = deepFreeze({
        a: 5,
        b: 'hello',
        c: {
          d: 'test'
        }
      });

      expect(() => ((<any>frozen).c.d = 23)).toThrowError();
    });

    it('should freeze nested arrays', () => {
      const frozen = deepFreeze([[1]]);

      expect(() => ((<any>frozen)[0][0] = 5)).toThrowError();
      expect(() => (<any>frozen)[0].push(5)).toThrowError();
    });

    it('should skip frozen sub-objects', () => {
      const frozen = deepFreeze({ test: Object.freeze({ nest: { val: 1 } }) });
      expect(() => ((<any>frozen).test.nest.val = 5)).not.toThrowError();
    });
  });

  describe('findCaseInsensitivePropInObj', () => {
    it('finds the value of a prop in an object and ignores casing', () => {
      const obj = { Foo: 'foo', Bar: 'bar' };
      expect(findCaseInsensitivePropInObj(obj, 'foo')).toBe('foo');
    });

    it('returns false if prop is not found', () => {
      expect(findCaseInsensitivePropInObj({ bar: 'bar' }, 'foo')).toBe(false);
    });
  });

  describe('hasProp', () => {
    it('returns true if a prop is on an object', () => {
      expect(hasProp('foo', { foo: 1 })).toBe(true);
    });

    it('returns false if a prop is on an object', () => {
      expect(hasProp('bar', { foo: 1 })).toBe(false);
    });
  });

  describe('identity', () => {
    it('returns itself', () => {
      const thing = {};
      expect(identity(thing)).toBe(thing);
    });
  });

  describe('isBoolean', () => {
    it('returns true if given a boolean', () => {
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(true)).toBe(true);
    });

    it('returns false if given a non boolean', () => {
      expect(isBoolean(1)).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('recognizes functions', () => {
      expect(isFunction(function() {})).toBe(true);
    });

    it('recognizes arrow functions', () => {
      expect(isFunction(() => {})).toBe(true);
    });

    it('rejects non functions', () => {
      expect(isFunction({})).toBe(false);
    });
  });

  describe('isNaN', () => {
    it('recognizes NaN', () => {
      expect(isNaN(NaN)).toBe(true);
    });

    it('rejects non-NaN', () => {
      expect(isNaN(0)).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('recognizes numbers', () => {
      expect(isNumber(7)).toBe(true);
    });

    it('rejects non-numbers', () => {
      expect(isNumber('7')).toBe(false);
    });
  });

  describe('isNull', () => {
    it('recognizes null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('rejects non-null', () => {
      expect(isNull(undefined)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('recognizes objects', () => {
      expect(isObject({})).toBe(true);
    });

    it('rejects non-objects', () => {
      expect(isObject(7)).toBe(false);
    });

    it('rejects null', () => {
      expect(isObject(null)).toBe(false);
    });
  });

  describe('isString', () => {
    it('recognizes strings', () => {
      expect(isString('7')).toBe(true);
    });

    it('rejects non-strings', () => {
      expect(isString(7)).toBe(false);
    });
  });

  describe('isUndefined (will break if global undefined defined)', () => {
    it('recognizes undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('rejects non-undefined', () => {
      expect(isUndefined(null)).toBe(false);
    });
  });

  describe('noop', () => {
    it('does nothing', () => {
      expect(noop()).toBe(undefined);
    });
  });

  describe('objEach', () => {
    it('iterates over an object', () => {
      let didRun = false;
      const obj = { a: 1 };
      objEach(obj, (value, key, index, dictionary) => {
        didRun = true;
        expect(value).toBe(1);
        expect(key).toBe('a');
        expect(index).toBe(0);
        expect(dictionary).toBe(obj);
      });
      expect(didRun).toBe(true);
    });
  });

  describe('objFilter', () => {
    it('iterates a filter over an object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const filtered = objFilter(obj, value => {
        if (value === 2) {
          return false;
        }
        return true;
      });
      expect(filtered).toEqual({ a: 1, c: 3 });
    });
  });

  describe('partial function', () => {
    function addThreeArgs(a: number, b: number, c: number): number {
      return a + b * c;
    }

    it('should work for a simple single argument', () => {
      expect(
        partial<(b: number, c: number) => number>(addThreeArgs, 3)(2, 3)
      ).toBe(9);
    });

    it('should work for two arguments', () => {
      expect(partial<(c: number) => number>(addThreeArgs, 3, 2)(3)).toBe(9);
    });

    it('should work for three arguments', () => {
      expect(partial<() => number>(addThreeArgs, 3, 2, 3)()).toBe(9);
    });
  });

  describe('pluck', () => {
    it('plucks a prop from an object', () => {
      const obj = { a: 1 };
      expect(pluck('a', obj)).toBe(1);
    });
  });

  describe('to integer conversions', () => {
    describe('toIntArray', () => {
      it('returns an array of integer values', () => {
        expect(toIntArray(['1', '2', '3'])).toEqual([1, 2, 3]);
      });

      it('returns an array no matter what input', () => {
        expect(toIntArray('foo' as any)).toEqual([]);
      });
    });

    describe('toIntArrayMax', () => {
      it('returns an array of integer values', () => {
        expect(toIntArrayMax(2, ['1', '2', '3'])).toEqual([1, 2, 2]);
      });

      it('returns an array no matter what input', () => {
        expect(toIntArrayMax(2, 'foo' as any)).toEqual([]);
      });
    });

    describe('toIntArrayMin', () => {
      it('returns an array of integer values', () => {
        expect(toIntArrayMin(2, ['1', '2', '3'])).toEqual([2, 2, 3]);
      });

      it('returns an array no matter what input', () => {
        expect(toIntArrayMin(2, 'foo' as any)).toEqual([]);
      });
    });

    describe('toGtZeroIntMax', () => {
      it('returns values in range as base 10 integers', () => {
        expect(toGtZeroIntMax(7, '6')).toBe(6);
      });

      it('caps numbers at the max', () => {
        expect(toGtZeroIntMax(10, '10')).toBe(10);
        expect(toGtZeroIntMax(10, '11')).toBe(10);
      });

      it('moves negative numbers up to zero', () => {
        expect(toGtZeroIntMax(10, '-12')).toBe(0);
      });
    });

    describe('toIntBetween', () => {
      it('caps values at the minimum', () => {
        expect(toIntBetween(0, 10, '0')).toBe(0);
        expect(toIntBetween(0, 10, '-1')).toBe(0);
      });

      it('caps values at the maximum', () => {
        expect(toIntBetween(0, 10, '10')).toBe(10);
        expect(toIntBetween(0, 10, '11')).toBe(10);
      });

      it('returns values in range', () => {
        expect(toIntBetween(0, 10, '5')).toBe(5);
      });
    });

    describe('toIntBetweenOptional', () => {
      it('does nothing if given no min/max', () => {
        expect(toIntBetweenOptional(undefined, undefined, '7')).toBe(7);
      });

      it('returns the maximum if given only a maximum', () => {
        expect(toIntBetweenOptional(undefined, 10, '10')).toBe(10);
        expect(toIntBetweenOptional(undefined, 10, '11')).toBe(10);
      });

      it('returns the minimum if given only a minimum', () => {
        expect(toIntBetweenOptional(0, undefined, '-1')).toBe(0);
        expect(toIntBetweenOptional(0, undefined, '0')).toBe(0);
      });

      it('returns a number if it is in range and has both max and min', () => {
        expect(toIntBetweenOptional(0, 10, '3')).toBe(3);
      });
    });
  });

  describe('toString', () => {
    it('converts numbers to strings', () => {
      expect(toString(7)).toBe('7');
    });

    it('calls toString on Objects', () => {
      const serializer = { toString: () => '3' };
      expect(toString(serializer)).toBe('3');
    });
  });

  describe('toStringArray', () => {
    it('converts array elements to strings', () => {
      expect(toStringArray([1, 2, 3])).toEqual(['1', '2', '3']);
    });

    it('returns arrays no matter what', () => {
      expect(toStringArray(7 as any)).toEqual([]);
    });
  });

  describe('toStringArrayMax', () => {
    it('converts array elements to strings with max lens', () => {
      expect(toStringArrayMax(1, [11, 21, 31])).toEqual(['1', '2', '3']);
    });

    it('returns arrays no matter what', () => {
      expect(toStringArrayMax(1, 7 as any)).toEqual([]);
    });
  });

  describe('toStringMax', () => {
    it('converts to a string and truncates', () => {
      expect(toStringMax(3, 'goodbye')).toBe('goo');
    });

    it('returns values within range', () => {
      expect(toStringMax(30, 'goodbye')).toBe('goodbye');
    });
  });

  describe('unzip', () => {
    it('splits an object into keys/values', () => {
      const result = unzip({ a: 1, b: 2, c: 3 });
      expect(result.keys).toEqual(['a', 'b', 'c']);
      expect(result.values).toEqual([1, 2, 3]);
    });

    it('joins an array of keys and array of values', () => {
      const keys = ['a', 'b', 'c'];
      const values = [1, 2, 3];
      expect(zip(keys, values)).toEqual({ a: 1, b: 2, c: 3 });
    });
  });
});
