import { getMine, getExt } from '../src';

test('getMine', () => {
  expect(getMine('js')).toBe('application/javascript');
});

test('getExt', () => {
  expect(getExt('application/javascript')).toEqual(['js', 'mjs']);
});
