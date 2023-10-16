export default function loadWorker(workerFunc: () => void): Worker {
  let code = workerFunc.toString();
  const blob = new Blob([`(${code})()`], { type: "application/javascript" });
  const worker = new Worker(URL.createObjectURL(blob));
  return worker;
}