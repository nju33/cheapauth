import {ILocalStorage} from './interfaces';

export class LocalStorage implements ILocalStorage {
  public key = '__cheapauth__';

  public get() {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(this.key);
  }

  public set(value: string) {
    localStorage.setItem(this.key, (value as unknown) as string);
  }
}
