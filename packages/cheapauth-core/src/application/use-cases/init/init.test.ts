/**
 * @jest-environment jsdom
 */

import {Init} from '.';

describe('wInit use case', () => {
  it('is approved', () => {
    const answer = 'answer';
    localStorage.setItem('__cheapauth__', answer);

    const login = new Init(answer);
    expect(login.invoke()).toEqual({approval: true});
  });

  it('is not approved', () => {
    const answer = 'answer';
    localStorage.setItem('__cheapauth__', '');

    const login = new Init(answer);
    expect(login.invoke()).toEqual({approval: false});
  });
});
