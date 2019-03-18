export class ObservableValue<T> {
  private subscribers: ((T) => void)[];
  private _value: T;

  constructor() {
    this.subscribers = [];
  }

  set value(newValue: T) {
    if(newValue !== this._value) {
      this._value = newValue;
      this.next(newValue);
    }
  }

  get value(): T {
    return this._value;
  }

  private next(value: T): void {
    for(const subscriber of this.subscribers) {
      subscriber(value);
    }
  }

  public subscribe(fn: (T) => void): number {
    return this.subscribers.push(fn);
  }

  public unsubscribe(index: number): void {
    this.subscribers = this.subscribers.splice(index, 1);
  }
}
