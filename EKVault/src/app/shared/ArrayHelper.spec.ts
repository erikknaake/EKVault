import {ArrayHelper} from "./ArrayHelper";

describe('ArrayHelper', () => {
  it('Should remove an object', () => {
    const expected = ['a', 'b', 'cd'];
    let actual = ['a', 'b', 'cd', 'de'];

    expect(ArrayHelper.removeItem(actual, 'de')).toEqual(expected);
  });

  it('Should remove multiple objects', () => {
    const expected = ['a', 'b', 'cd'];
    let actual = ['a', 'b', 'cd', 'de', 'de'];
    expect(ArrayHelper.removeItem(actual, 'de')).toEqual(expected);
  });

  it('Should remove no objects', () => {
    const expected = ['a', 'b', 'cd'];
    let actual = ['a', 'b', 'cd'];

    expect(ArrayHelper.removeItem(actual, '7')).toEqual(expected);
  });
});
