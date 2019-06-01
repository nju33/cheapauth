import {PasswordImpl} from '../../entities/password';

export interface CheapauthThemeStruct {
  accentColor?: string;
  backgroundColor?: string;
}

export interface CheapauthComponentProps {
  theme?: CheapauthThemeStruct;
  title: string;
  submitLabel: string;
  password: string;
}

export interface CheapauthComponentAuthorizationState {
  answer: PasswordImpl;
  approval: boolean;
}

export interface CheapauthComponentFalsyFormState {
  error: boolean;
  errorMessage: string;
}
