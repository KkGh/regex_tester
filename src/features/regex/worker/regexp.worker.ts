export type RegExpWorkerRequest = {
    action: "matchAll";
    regexp: RegExp;
    input: string;
};

export type RegExpWorkerResponse = {
    result: RegExpMatchArray[];
    elapsed: number;
}

/* eslint-disable no-restricted-globals */
export function regexpFunc() {
    self.addEventListener("message", (event: MessageEvent<RegExpWorkerRequest>) => {
        const response = regexpCore(event);
        self.postMessage(response);
    });

    function regexpCore(event: MessageEvent<RegExpWorkerRequest>): RegExpWorkerResponse {
        const { action, regexp, input } = event.data;
        const start = Date.now();
        let result;

        // if (action === "matchAll") {
        // 巨大なテキストではpostMessageによるコピー時に outofmemory が発生するため
        // inputをundefinedにする
        const matches = doMatch(input, regexp);
        matches.forEach(m => m.input = undefined);
        result = matches;
        // }
        const end = Date.now();

        return { result, elapsed: end - start };
    }

    // from: RegUtils.doMatch
    function doMatch(input: string, regexp: RegExp): RegExpMatchArray[] {
        if (regexp.global) {
            return [...input.matchAll(regexp)];
        }
        else {
            const m = input.match(regexp);
            return m !== null ? [m] : [];
        }
    }
}
