import { createBetween, noop } from './utility';
import { create } from 'domain';

describe('utility functions', () => {
  describe('noop', () => {
    it('does nothing', () => {
      expect(noop()).toBe(undefined);
    });
  });

  describe('createBetween', ()  => {
    it('is inclusive of the minimum', () => {
      const between = createBetween(() => 0);
      expect(between(0, 100)).toBe(0);
    });

    it('is dependent on the given random function for max exclusivity', () => {
      const between = createBetween(() => 5);
      expect(between(0, 100)).toBe(500);
    });
  });
});
