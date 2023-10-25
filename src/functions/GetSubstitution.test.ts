import { GetSubstitution } from "./GetSubstitution";

describe("GetSubstitution", () => {
  it("replaces string with template", () => {
    const str = "apple,banana,orange";
    const matches = [...str.matchAll(/\w+/g)];
    const replacementTemplate = "[$&]";

    const result = [];
    for (const match of matches) {
      const matched = match[0];
      const position = match.index!;
      const captures: string[] = [];
      const namedCaptures = undefined;
      const sub = GetSubstitution(
        matched,
        str,
        position,
        captures,
        namedCaptures,
        replacementTemplate
      );
      result.push(sub);
    }
    expect(result).toEqual(["[apple]", "[banana]", "[orange]"]);
  });

  it("replaces string with special template", () => {
    const str = "apple,banana,orange";
    const replacementTemplate = "$$__$&__$1__$<key>__$2__$99__$`__$'__$<";

    const matches = [...str.matchAll(/(?<key>banana)/g)];
    const match = matches[0];
    const matched = match[0];
    const position = match.index!;
    const captures = match.slice(1);
    const namedCaptures = match.groups;
    const sub = GetSubstitution(
      matched,
      str,
      position,
      captures,
      namedCaptures,
      replacementTemplate
    );

    expect(sub).toEqual(
      "$__banana__banana__banana__$2__$99__apple,__,orange__$<"
    );
  });

  it("replaces invalid group with empty string", () => {
    const str = "apple,123,orange";
    const replacementTemplate = "_$<nums>_";

    const match = str.match(/(?<numbers>\d+)/)!;
    const matched = match[0];
    const position = match.index!;
    const captures = match.slice(1);
    const namedCaptures = match.groups;
    const sub = GetSubstitution(
      matched,
      str,
      position,
      captures,
      namedCaptures,
      replacementTemplate
    );

    expect(sub).toEqual("__");
  });
});
