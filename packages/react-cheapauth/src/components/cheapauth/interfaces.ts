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

export interface CheapauthComponentTruhyFormState {
  error: true;
  errorMessage: string;
}

export interface CheapauthComponentFalsyFormState {
  error: false;
}

export interface CheapauthComponentAuthorizationState {
  password?: PasswordImpl;
  approval: boolean;
}

export type CheapauthComponentState = CheapauthComponentAuthorizationState &
  (CheapauthComponentTruhyFormState | CheapauthComponentFalsyFormState);
