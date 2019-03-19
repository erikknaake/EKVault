import {ObservableValue} from "./ObservableValue";
import {ISubscriber} from "./ISubscriber";

describe('ObservableValue', () => {
  let observerable: ObservableValue<string>;

  beforeEach(() => {
    observerable = new ObservableValue<string>();
  });

  it('should set and get values', () => {
    observerable.value = 'a';
    expect(observerable.value).toEqual('a');
  });

  it('should notify subscribers', (done) => {
    observerable.subscribe((value) => {
      expect(value).toEqual('b');
      done();
    });
    observerable.value = 'b';
  });

  it('should be unsubsribable', (done) => {
    const subscription: ISubscriber<string> = observerable.subscribe((value) => {
      expect(value).toEqual('b');
    });
    const extraSub = observerable.subscribe(() => {});
    observerable.value = 'b';
    observerable.unsubscribe(subscription);
    observerable.value = 'c';
    expect(observerable['subscribers'].length).toEqual(1);
    done();
  });
});
