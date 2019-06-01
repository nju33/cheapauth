import {PasswordStruct, PasswordImpl} from './interfaces';

export class Password implements PasswordStruct, PasswordImpl {
  public value: PasswordStruct['value'];

  public constructor(value: PasswordStruct['value']) {
    this.value = value;
  }

  public isEqual(input: string): boolean {
    return this.value === input;
  }
}
