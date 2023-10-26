// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { WorkerMock } from "./testhelper/WorkerMock";

// userEventを使用するときに以下のエラーが発生するため、Mock関数を用意して回避する。
// TypeError: range(...).getBoundingClientRect is not a function.
// 詳細: https://github.com/jsdom/jsdom/issues/3002
document.createRange = () => {
  const range = new Range();
  range.getBoundingClientRect = jest.fn();
  range.getClientRects = jest.fn(() => ({
    item: () => null,
    length: 0,
    [Symbol.iterator]: jest.fn(),
  }));
  return range;
};
