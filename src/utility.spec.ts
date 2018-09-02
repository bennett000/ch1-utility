import { noop } from './utility';

describe('utility functions', () => {
  describe('noop', () => {
    it('does nothing', () => {
      expect(noop()).toBe(undefined);
    });
  });
});
