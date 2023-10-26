import { useCallback, useRef, useState } from "react";

/**
 * 単一のWeb Workerによるバックグラウンド処理を行うカスタムフック。
 * タイムアウト、処理中のリスタートに対応。
 * 
 * ```
   const { status, startTask } = useSingleWorker<string>(() => new Worker("sample.worker.ts"));
   const message = {
     action: "matchAll",
     regexp: /ab/g,
     input: "abcdabc",
   };
   startTask(message, 100);
 * ```
 */
export function useSingleWorker<T, TResult>(workerFactory: () => Worker) {
  // TODO:リファクタリング
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<TResult>();

  // if (Worker === undefined) {
  //   throw new Error("cannot use Worker");
  // }

  const cleanup = useCallback((killWorker: boolean, error = "") => {
    if (killWorker && workerRef.current) {
      //console.log("Worker killed", workerID.current);
      workerRef.current.terminate();
      workerRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setErrorMessage(error);
    setRunning(false);
  }, []);

  const startTask = useCallback(
    (message: T, timeout: number) => {
      // 処理中のworkerを強制終了
      if (timeoutRef.current) {
        cleanup(true, "restart");
      }

      if (workerRef.current === null) {
        workerRef.current = workerFactory();
        // workerID.current = workerID.current + 1;
      }

      // タイムアウトで強制終了
      timeoutRef.current = setTimeout(() => {
        cleanup(true, "timeout");
      }, timeout);

      workerRef.current.onmessage = (e) => {
        console.log("onmessage");

        setResult(e.data);
        cleanup(false);
      };

      workerRef.current.onerror = (e) => {
        cleanup(false, e.message);
      };

      workerRef.current.postMessage(message);
      setRunning(true);
      setErrorMessage("");
    },
    [cleanup, workerFactory]
  );

  return {
    status: {
      result,
      errorMessage,
      running,
    },
    startTask,
  };
}
