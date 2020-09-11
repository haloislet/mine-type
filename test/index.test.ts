import { getMine, getExt, getExts, getMines } from '../src';

test('getMine', () => {
  expect(getMine('js')).toBe('application/javascript');
});

test('getExt', () => {
  expect(getExt('application/javascript')).toEqual(['js', 'mjs']);
});

test('getMines', () => {
  expect(getMines('js', 'html')).toEqual([
    'application/javascript',
    'text/html',
  ]);
  expect(getMines('js', ['html'])).toEqual([
    'application/javascript',
    'text/html',
  ]);
});

test('getExts', () => {
  expect(getExts('application/javascript', ['text/html'])).toEqual([
    'js',
    'mjs',
    'html',
    'htm',
    'shtml',
  ]);
  expect(getExts('application/javascript', 'text/html')).toEqual([
    'js',
    'mjs',
    'html',
    'htm',
    'shtml',
  ]);
});
