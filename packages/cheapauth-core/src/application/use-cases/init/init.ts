import {IInit} from './interfaces';
import {ILocalStorage, LocalStorage} from '../../../entities/local-storage';

export class Init implements IInit {
  public readonly answer: string;

  public readonly localStorage: ILocalStorage = new LocalStorage();

  public constructor(answer: string) {
    this.answer = answer;
  }

  public invoke() {
    const inputValue = this.localStorage.get();

    if (inputValue === null) {
      return {
        approval: false,
      };
    }

    return {
      approval: inputValue === this.answer,
    };
  }
}
