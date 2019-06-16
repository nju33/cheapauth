export interface CheapauthThemeStruct {
  accentColor?: string;
  backgroundColor?: string;
}

export interface CheapauthComponentProps {
  theme?: CheapauthThemeStruct;
  errorMessage?: string;
  icon?: string;
  label: string;
  submitLabel: string;
  password: string;
}

export interface CheapauthComponentUIState {
  showForm: boolean;
}

export interface CheapauthComponentTruthyFormState {
  error: true;
  errorMessage: string;
}

export interface CheapauthComponentFalsyFormState {
  error: false;
}

export interface CheapauthComponentAuthorizationState {
  approval: boolean;
}

export type CheapauthComponentState = CheapauthComponentUIState &
  CheapauthComponentAuthorizationState &
  (CheapauthComponentTruthyFormState | CheapauthComponentFalsyFormState);
