import {Component} from 'vue';

interface CheapauthComponentData {
  input: string;
  approval: boolean;
  error: boolean;
  errorMessage: string;
}

interface CheapauthComponentMethods {
  onSubmit(): void;
}

interface CheapauthComponentComputed {
  answer: {
    value: string;
    isEqual(input: string): boolean;
  };
}

interface CheapauthComponentProps {
  password: string;
  title: string;
  submitLabel: string;
}

export declare type CheapauthComponent = Component<
  CheapauthComponentData,
  CheapauthComponentMethods,
  CheapauthComponentComputed,
  CheapauthComponentProps
>;

export declare const Cheapauth: CheapauthComponent;

export default Cheapauth;
