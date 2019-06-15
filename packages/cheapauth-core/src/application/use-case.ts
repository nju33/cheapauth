export interface UseCaseImpl<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoke(...args: any[]): T;
}
