export interface ISubscriber<T> {
  fn: ((T) => void);
  nr: number;
}
