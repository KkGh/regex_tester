type MessageHandler = (msg: string) => void;

/**
 * jestではWeb Workerが使用できないためmockを用意する。
 */
export class WorkerMock {
    url: string;
    onmessage: MessageHandler;

    constructor(stringUrl: string) {
        this.url = stringUrl;
        this.onmessage = (e) => { };
    }
    postMessage(msg: string): void {
        // this.onmessage(msg);
    }
}