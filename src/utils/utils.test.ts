import { it, expect } from 'vitest';
import * as utils from './utils';

it('should give string with first char upper', () => {
  expect(utils.toTitleCase('something')).toEqual('Something');
});

it('should give a random number in range', () => {
  expect(utils.generateRandomInt(-100, 100))
    .toBeGreaterThanOrEqual(-100)
    .toBeLessThanOrEqual(100);
});
