/**
 * @jest-environment jsdom
 */

import {LocalStorage} from '.';

test('localStorage', () => {
  const localStorage = new LocalStorage();
  const value = 'aaa';

  expect(localStorage.get()).toBeNull();
  localStorage.set(value);
  expect(localStorage.get()).toBe(value);
});
