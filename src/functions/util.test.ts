import { wait } from "@testing-library/user-event/dist/utils";
import { countCaptureGroup, escapeHtml } from "./util";
import { debounce } from "./debounce";

describe("debounse", () => {
    it("should run the last call only", async () => {
        let total = 0;
        const f = debounce((v: number) => {
            total += v;
        }, 10);

        for (let i = 0; i < 10; i++) {
            f(i);
        }
        await wait(100);
        expect(total).toBe(9);
    });
});


describe("escapeHTML", () => {
    it("escapes special characters", () => {
        expect(escapeHtml("<div></div>")).toBe("&lt;div&gt;&lt;/div&gt;");
        expect(escapeHtml("true & false")).toBe("true &amp; false");
        expect(escapeHtml(`_"_'_\`_`)).toBe("_&quot;_&#x27;_&#x60;_");
    });
});

describe("countCaptureGroup", () => {
    it("returns group count", () => {
        expect(countCaptureGroup(/A(\d+)/, "_A123_")).toBe(1);
        expect(countCaptureGroup(/A(\d+)/, "_B123_")).toBe(0);
    });
});