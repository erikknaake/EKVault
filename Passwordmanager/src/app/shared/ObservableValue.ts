import {ISubscriber} from "./ISubscriber";

export class ObservableValue<T> {
  private subscribers: ISubscriber<T>[];
  private _value: T;
  private highestNumber: number = 0;

  constructor() {
    this.subscribers = [];
  }

  set value(newValue: T) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.next(newValue);
    }
  }

  get value(): T {
    return this._value;
  }

  private next(value: T): void {
    for (const subscriber of this.subscribers) {
      subscriber.fn(value);
    }
  }

  public subscribe(fn: (T) => void): ISubscriber<T> {
    this.subscribers.push({fn: fn, nr: this.nextNumber()});
    return this.subscribers[this.highestNumber - 1];
  }

  public unsubscribe(subscriptionToRemove: ISubscriber<T>): void {
    const newSubscribers: ISubscriber<T>[] = [];
    for (let subsription of this.subscribers) {
      if (subsription.nr !== subscriptionToRemove.nr) {
        newSubscribers.push(subsription);
      }
    }
    this.subscribers = newSubscribers;
  }

  private nextNumber(): number {
    return ++this.highestNumber;
  }
}
