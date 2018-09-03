import {
  createBetween,
  identity,
  isFunction,
  isNumber,
  isObject,
  isNaN,
  isNull,
  isString,
  isUndefined,
  noop
} from './utility';
import { create } from 'domain';
import { isRegExp } from 'util';

describe('utility functions', () => {
  describe('noop', () => {
    it('does nothing', () => {
      expect(noop()).toBe(undefined);
    });
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

  describe('identity', () => {
    it('returns itself', () => {
      const thing = {};
      expect(identity(thing)).toBe(thing);
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

  describe('isNumber', () => {
    it('recognizes numbers', () => {
      expect(isNumber(7)).toBe(true);
    });

    it('rejects non-numbers', () => {
      expect(isNumber('7')).toBe(false);
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
});
