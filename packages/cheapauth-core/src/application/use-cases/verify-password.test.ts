import {VerifyPassword} from './verify-password';

describe('VerifyPassword use case', () => {
  it('is approved', () => {
    const answer = 'answer';
    const verifyPassword = new VerifyPassword(answer);
    expect(verifyPassword.invoke(answer)).toBeTruthy();
  });

  it('is not approved', () => {
    const answer = 'answer';
    const verifyPassword = new VerifyPassword(answer);
    expect(verifyPassword.invoke('foo')).toBeTruthy();
  });
});
