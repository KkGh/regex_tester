type CallbackFunction<T extends any[]> = (...args: T) => void;
/**
 * 連続した呼び出しに対して最後の1回だけ callback を実行する関数を生成する。
 *
 * usage:
 * ```ts
 * const f = debounce((message: string) => {
 *     console.log(message);
 * }, 100);
 * for (let i = 0; i < 10; i++) {
 *     f("message:" + i);
 * }
 * // => message:9
 * ```
 */
export const debounce = <T extends any[]>(
  callback: CallbackFunction<T>,
  wait = 100
): CallbackFunction<T> => {
  let id = 0;
  return (...args: T) => {
    window.clearTimeout(id);
    id = window.setTimeout(() => callback(...args), wait);
  };
};
