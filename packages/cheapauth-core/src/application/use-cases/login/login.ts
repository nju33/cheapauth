import {ILogin} from './interfaces';
import {ILocalStorage, LocalStorage} from '../../../entities/local-storage';

export class Login implements ILogin {
  public readonly answer: string;

  public readonly localStorage: ILocalStorage = new LocalStorage();

  public constructor(answer: string) {
    this.answer = answer;
  }

  public invoke(password: string) {
    const approval = password === this.answer;

    if (approval) {
      this.localStorage.set(password);
    }

    return approval;
  }
}
