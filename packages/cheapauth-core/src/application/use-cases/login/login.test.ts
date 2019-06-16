import {Login} from '.';

describe('Login use case', () => {
  it('is approved', () => {
    const answer = 'answer';
    const login = new Login(answer);
    expect(login.invoke(answer)).toBeTruthy();
  });

  it('is not approved', () => {
    const answer = 'answer';
    const login = new Login(answer);
    expect(login.invoke('foo')).toBeFalsy();
  });
});
