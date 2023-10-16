import { renderHook, waitFor } from '@testing-library/react';
import { createRegexpWorker } from './createRegexpWorker';
import { useRegexpWorker } from './useRegexpWorker';

jest.mock("./createRegexpWorker");
const mockFunc = createRegexpWorker as jest.Mock;

describe("useRegexpWorker", () => {
  let onmessage: jest.Mock;
  let postMessage: jest.Mock;

  beforeEach(() => {
    // Web Workerの onmessage をどうやってモックする？
    onmessage = jest.fn();
    postMessage = jest.fn();
    mockFunc.mockImplementation(() => {
      return {
        onmessage: onmessage,
        onerror: jest.fn(),
        postMessage: postMessage,
        terminate: jest.fn(),
      };
    });
  });

  afterEach(() => {
    mockFunc.mockClear();
    onmessage.mockClear();
    postMessage.mockClear();
  });

  it("use Web Worker", async () => {
    const { result } = renderHook(() => useRegexpWorker({
      reg: /\w+/gd, isEmpty: false, text: "test string", delay: 1
    }));

    await waitFor(() => {
      expect(postMessage).toBeCalledWith({
        action: "matchAll",
        input: "test string",
        regexp: /\w+/dg
      });
    });
    expect(mockFunc).toBeCalled();
    expect(result.current.currentText).toEqual("test string");
  });

  // 非同期モックの内部stateが変更されるとjestがact警告を吐く
});