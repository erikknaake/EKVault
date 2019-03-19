export class ArrayHelper {
  public static removeItem<T>(arr: T[], item: T): T[] {
    return arr.filter((x: T) => x !== item);
  }
}
