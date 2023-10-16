import { useEffect, useReducer } from 'react';
import { createRegexpWorker } from './createRegexpWorker';
import { RegExpWorkerRequest, RegExpWorkerResponse } from './regexp.worker';
import { useDebounceCallback } from '../../../hooks/useDebounceCallback';
import { useSingleWorker } from '../../../hooks/useSingleWorker';

type RegexpWorkerArgs = {
  reg: RegExp | null, // エラー時にはnullが入る
  text: string;
  isEmpty: boolean;
  delay?: number;
  timeout?: number;
};

// TODO:ドキュメント
export const useRegexpWorker = ({
  reg,
  text,
  isEmpty,
  delay = 100,
  timeout = 300,
}: RegexpWorkerArgs
) => {

  // （pattern, flags, isError を受け取るパターンと、
  // nullableなRegExp, isEmptyを受け取るパターンがある、どちらが良い？）

  const debounce = useDebounceCallback(delay);
  const { status, startTask } = useSingleWorker<RegExpWorkerRequest, RegExpWorkerResponse>(createRegexpWorker);
  const [state, dispatch] = useReducer(reducer, {
    currentText: text,
    execArray: [],
    elapsed: 0,
    running: false,
    errorMessage: "",
  });
  const { currentText, execArray, elapsed, running, errorMessage } = state;

  useEffect(() => {
    // カスタムフックは分岐内で呼び出せないため、
    // エラーや空パターンのチェックをここで行う
    if (reg) {
      debounce(() => {
        if (isEmpty) {
          dispatch({
            type: "skip",
            currentText: text,
          });
        }
        else {
          startTask({
            action: "matchAll",
            regexp: reg,
            input: text,
          }, timeout);

          dispatch({ type: "start" });
        }
      });
    }
  }, [debounce, startTask, text, isEmpty, timeout, reg]);

  useEffect(() => {
    if (status.result) {
      dispatch({
        type: 'done',
        currentText: text,
        execArray: status.result.result,
        elapsed: status.result.elapsed,
      });
    } else if (status.errorMessage) {
      dispatch({
        type: 'error',
        currentText: text,
        errorMessage: status.errorMessage,
      });
    }

    // バックグラウンドタスク終了時に、そのタスクの送信値を返す
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.result]);

  return { currentText, execArray, elapsed, running, errorMessage };
};

type State = {
  currentText: string;
  execArray: RegExpMatchArray[];
  elapsed: number;
  running: boolean;
  errorMessage: string;
}

type Action = {
  type: "skip";
  currentText: string;
} | {
  type: "start";
} | {
  type: "done";
  currentText: string;
  execArray: RegExpMatchArray[];
  elapsed: number;
} | {
  type: "error";
  currentText: string;
  errorMessage: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'skip':
      return {
        currentText: action.currentText,
        execArray: [],
        elapsed: 0,
        running: false,
        errorMessage: "",
      };
    case 'start':
      return {
        ...state,
        running: true
      }
    case 'done':
      return {
        currentText: action.currentText,
        execArray: action.execArray,
        elapsed: action.elapsed,
        running: false,
        errorMessage: "",
      };
    case 'error':
      return {
        currentText: action.currentText,
        execArray: [],
        elapsed: 0,
        running: false,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
