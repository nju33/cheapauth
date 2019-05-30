export interface PasswordStruct {
  value: string;
}

export interface PasswordImpl {
  isEqual(otherPassword: string): boolean;
}
