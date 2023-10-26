export function* take<T>(
  iterable: Iterable<T>,
  count: number
): Generator<T, void, unknown> {
  let i = 0;
  for (const item of iterable) {
    if (i === count) return;
    yield item;
    i++;
  }
}
