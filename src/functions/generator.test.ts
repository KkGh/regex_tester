import { pairwise } from "./array";
import { take } from "./generator";

describe("take", () => {
    it("returns first N items", () => {
        const n = 10;
        const pairs = pairwise(Array.from({ length: n }, (_, i) => i));
        expect([...take(pairs, 10)]).toHaveLength(10);

        const pairs2 = pairwise(Array.from({ length: 2 }, (_, i) => i));
        expect([...take(pairs2, 10)]).toHaveLength(1);
    });
});