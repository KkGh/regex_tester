import { suggestFromText } from "./regest";

describe("suggest", () => {
    it("returns regexp with character class", () => {
        expect_match(
            "The dog",
            "The fox",
            /The (\w+?)/g);
        expect_match(
            "The 123",
            "The 4",
            /The (\d+?)/g);
        expect_match(
            "The word string",
            "The a1!$ string",
            /The (\S+?) string/g);
        expect_match(
            "The string",
            "The s\n\ntring",
            /The s(\n*?)tring/g);
        expect_match(
            "The string",
            "The s\t\ttring",
            /The s(\t*?)tring/g);
        expect_match(
            "The 1A#$\t!",
            "The number!",
            /The (.+?)!/g);
        expect_match(
            "The str\ning!",
            "The number!",
            /The ([\s\S]+?)!/g);
    });

    it("returns regexp with *", () => {
        expect_match("The ", "The 123", /The (\d*?)/g);
    });
});

function expect_match(text1: string, text2: string, regexp: RegExp) {
    const reg = suggestFromText(text1, text2);
    expect(reg).toEqual(regexp);
    expect(text1.match(regexp)).toBeTruthy();
    expect(text2.match(regexp)).toBeTruthy();
}