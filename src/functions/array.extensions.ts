/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-extend-native */
export {};

declare global {
  interface Array<T> {
    /**
     * just `reduce((a, b) => a + b, 0)`
     */
    sum(this: Array<number>): number;
    minBy<V>(prop: (v: T) => V): T;
    maxBy<V>(prop: (v: T) => V): T;
  }
}

/* usage:
 * import "./utils/array.extensions";
 * [1, 2, 3].sum();
 */
Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};

Array.prototype.minBy = function <T, V>(this: T[], prop: (v: T) => V): T {
  return this.reduce((a, b) => (prop(a) < prop(b) ? a : b));
};

Array.prototype.maxBy = function <T, V>(this: T[], prop: (v: T) => V): T {
  return this.reduce((a, b) => (prop(a) > prop(b) ? a : b));
};
