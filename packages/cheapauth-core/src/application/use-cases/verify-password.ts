import {UseCaseImpl} from '../use-case';

export class VerifyPassword implements UseCaseImpl<boolean> {
  public readonly answer: string;

  public constructor(answer: string) {
    this.answer = answer;
  }

  public invoke(password: string) {
    return password === this.answer;
  }
}
