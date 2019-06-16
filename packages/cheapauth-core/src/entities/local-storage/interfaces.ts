export interface LocalStorageImpl {
  get(): string | null;
  set(value: string): void;
}

export type ILocalStorage = LocalStorageImpl;
