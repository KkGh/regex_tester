/* eslint-disable no-control-regex */
import { Regex } from "./Regex";

describe("regex matches() result", () => {
  it("may empty", () => {
    const ms = Regex.matches(/(?:)/dg, "abc");

    expect(ms.length).toBe(4);
    expect(ms[0].text).toBe("");
    expect(ms[0].start).toBe(ms[0].end);
  });

  it("contain Match", () => {
    const ms = Regex.matches(/bcd/dg, "abcdefg");

    expect(ms[0].start).toBe(1);
    expect(ms[0].end).toBe(4);
    expect(ms[0].text).toBe("bcd");
    expect(ms[0].matchIndex).toBe(0);
    expect(ms[0].groups.length).toBe(0);
  });

  it("contain Group array", () => {
    const ms = Regex.matches(/<(.+?) (.+?)>/dg, "<div class> <li style>");

    expect(ms[0].groups.length).toBe(2);
    expect(ms[0].matchIndex).toBe(0);

    expect(ms[0].groups[0].text).toBe("div");
    expect(ms[0].groups[0].start).toBe(1);
    expect(ms[0].groups[0].end).toBe(4);
    expect(ms[0].groups[0].groupIndex).toBe(1);

    expect(ms[0].groups[1].text).toBe("class");
    expect(ms[0].groups[1].start).toBe(5);
    expect(ms[0].groups[1].end).toBe(10);
    expect(ms[0].groups[1].groupIndex).toBe(2);
  });

  it("contain nested groups", () => {
    const ms = Regex.matches(/(<(.+?) (.+?)>)/dg, "<div class> <li style>");

    expect(ms[0].groups.length).toBe(3);
    expect(ms[0].groups[0].text).toBe("<div class>");
    expect(ms[0].groups[1].text).toBe("div");
    expect(ms[0].groups[2].text).toBe("class");
  });

  it("contain group with empty text when capturegroup didnt match", () => {
    const ms = Regex.matches(/(\d)?/dg, "apple");

    expect(ms[0].groups.length).toBe(1);
    expect(ms[0].groups[0].text).toBe("");
  });

  // it("# undefined indices test", () => {

  //     const r = /(?<ab>ab)|(?<cd>cd)/gd;
  //     const ms = Array.from("cd".matchAll(r));
  //     for (const m of ms) {
  //         console.log(m);
  //         console.log("indicesの中身は", m.indices);
  //         console.log(m.groups);

  //         // if (m.groups) {
  //         //     for (const [k, v] of Object.entries(m.groups)) {
  //         //         console.log("groupsの中身は", k, v);
  //         //     }
  //         // }

  //     }
  // });
});

describe("regex matches() by array", () => {
  it("contains groups", () => {
    const array = [..."<div class> <li style>".matchAll(/<(.+?) (.+?)>/dg)];
    const ms = Regex.matches(array);

    expect(ms[0].groups.length).toBe(2);
    expect(ms[0].matchIndex).toBe(0);

    expect(ms[0].groups[0].text).toBe("div");
    expect(ms[0].groups[0].start).toBe(1);
    expect(ms[0].groups[0].end).toBe(4);
    expect(ms[0].groups[0].groupIndex).toBe(1);

    expect(ms[0].groups[1].text).toBe("class");
    expect(ms[0].groups[1].start).toBe(5);
    expect(ms[0].groups[1].end).toBe(10);
    expect(ms[0].groups[1].groupIndex).toBe(2);
  });
});

describe("regex pattern", () => {
  it("can contain special classes", () => {
    expect(Regex.matches(/\b/dg, "Hello World").length).toBe(4);
    expect(Regex.matches(/\n/dg, "Hello\nWorld").length).toBe(1);
    expect(Regex.matches(/\cI/dg, "Hello\tWorld").length).toBe(1);
    expect(Regex.matches(/\x09/dg, "Hello\tWorld").length).toBe(1);
    expect(Regex.matches(/\u3042/dg, "HelloあWorld").length).toBe(1);
    expect(Regex.matches(/\u{3042}/dgu, "HelloあWorld").length).toBe(1);
  });

  it("can contain assertions", () => {
    expect(Regex.matches(/Jack(?=Sprat)/dg, "JackBlack JackSprat").length).toBe(
      1
    );
    expect(Regex.matches(/\d+(?!\.)/dg, "123 45.67 .89")?.[0].text).toBe("123");
  });

  it("can contain (named) capture groups", () => {
    expect(Regex.matches(/(.+) (.+)/dg, "Hello World")?.[0].groups.length).toBe(
      2
    );
    expect(
      Regex.matches(/(?<first>.+) (?<second>.+)/dg, "Hello World")?.[0].groups
        .length
    ).toBe(2);
  });

  it("can contain unicode property", () => {
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape
    // ユニコード文字クラスエスケープ \p{...} \P{...}
    // ユニコードプロパティで指定された文字に一致する。
    // ユニコードプロパティとは、ユニコード文字毎に割り当てられたいくつかのプロパティ（の名前と値）。
    // 基本的なフォーマットは /\p{name=value}/

    // 1．非バイナリプロパティ (General_Category, Script, Script_Extensions の3種)
    expect(
      Regex.matches(/\p{General_Category=Punctuation}+/gu, "Hello,World")?.[0]
        .text
    ).toBe(",");
    expect(
      Regex.matches(/\p{Script=Hiragana}+/gu, "Hello せかい")?.[0].text
    ).toBe("せかい");
    expect(
      Regex.matches(/\p{Script_Extensions=Hiragana}+/gu, "Hello ワールド")?.[0]
        .text
    ).toBe("ー");

    // エイリアス
    expect(Regex.matches(/\p{gc=punct}+/gu, "Hello,World")?.[0].text).toBe(",");
    expect(Regex.matches(/\p{gc=P}+/gu, "Hello,World")?.[0].text).toBe(",");
    expect(Regex.matches(/\p{sc=Hira}+/gu, "Hello せかい")?.[0].text).toBe(
      "せかい"
    );
    expect(Regex.matches(/\p{scx=Thaana}+/gu, "Hello ٢")?.[0].text).toBe("٢");

    // General_Category の場合はプロパティ名を省略できる
    expect(Regex.matches(/\p{P}/gu, "Hello,World")?.[0].text).toBe(",");

    // 2．バイナリプロパティ (ASCII, Alphabetic, Math, Emoji, ...)
    // プロパティ名のみ、値はない
    expect(Regex.matches(/\p{Alphabetic}+/gu, "Hello,せかい")?.[0].text).toBe(
      "Hello"
    );
    expect(Regex.matches(/\p{Emoji}+/gu, "Hello, 👌")?.[0].text).toBe("👌");
  });
});

describe("replace()", () => {
  it("replaces $N with capturegroup", () => {
    const p = /(.+)\s(.+)/g;

    expect(Regex.replace(p, "Hello World", "$2 $1")).toBe("World Hello");
    expect(Regex.replace(p, "Hello World", "$2 $1 $3")).toBe("World Hello $3");
  });

  it("replaces empty group text", () => {
    const p = /(\w+)?/g;

    expect(Regex.replace(p, "Hello World", "[$1]")).toBe("[Hello][] [World][]");
  });
});

/** 置換文字列で利用可能な特殊な置換パターン：
 $$	"$" を挿入します。
 $&	一致した部分文字列を挿入します。
 $`	一致した部分文字列の直前の文字列の部分を挿入します。
 $'	一致した部分文字列の直後の文字列の部分を挿入します。
 $n	n 番目（1 基点）にキャプチャされた文字列を挿入します。n は 100 未満の正の整数です。
 $<Name>	Name はグループ名で、指定された名前のキャプチャグループを挿入します。
 */
describe("replace() with special replacement patterns", () => {
  it('replaces $$ with "$"', () => {
    const text = "apple,banana,orange";
    const result = Regex.replace(/banana/g, text, "$$");
    expect(result).toBe("apple,$,orange");
  });

  it("replaces $& with matched substring", () => {
    const text = "apple,banana,orange";
    const result = Regex.replace(/banana/g, text, "$& fruit");
    expect(result).toBe("apple,banana fruit,orange");
  });

  it("replaces $` with substring before matched substring", () => {
    const text = "apple,banana,orange";
    const result = Regex.replace(/banana/g, text, "$` is a");
    expect(result).toBe("apple,apple, is a,orange");
  });

  it("replaces $' with substring after matched substring", () => {
    const text = "apple,banana,orange";
    const result = Regex.replace(/banana/g, text, "$' is delicious");
    expect(result).toBe("apple,,orange is delicious,orange");
  });

  it("replaces $n with nth captured group", () => {
    const text = "apple,banana,orange";
    const result = Regex.replace(/(banana)/g, text, "I ate $1");
    expect(result).toBe("apple,I ate banana,orange");
  });

  it("replaces $<Name> with captured group using group name", () => {
    const text = "apple,banana,orange";
    const result = Regex.replace(/(?<fruit>banana)/g, text, "I love $<fruit>");
    expect(result).toBe("apple,I love banana,orange");
  });

  it("replaces $n with empty string in OR", () => {
    expect(Regex.replace(/(f)|(g)/g, "foo", "$2")).toBe("oo");
  });
});

describe("extract()", () => {
  it("output $&", () => {
    const text = "apple,banana";
    const result = Regex.extract(/\w+/g, text, "[$&]");
    expect(result).toBe("[apple][banana]");
  });

  it("output multiple $&", () => {
    const text = "apple,banana";
    const result = Regex.extract(/\w+/g, text, "[$&]:$&");
    expect(result).toBe("[apple]:apple[banana]:banana");
  });

  it("output empty group text", () => {
    const text = "apple,banana";
    const result = Regex.extract(/(\w+)?/g, text, "[$1]");
    expect(result).toBe("[apple][][banana][]");
  });
});

describe("replaceAllWithIndex", () => {
  it("returns indices", () => {
    const result = Regex.replaceAllWithIndex(
      /(\w+)/g,
      "apple,banana,orange",
      "[$1]"
    );

    expect(result).toEqual({
      str: "[apple],[banana],[orange]",
      replacements: [
        { oldValue: "apple", oldIndex: 0, newValue: "[apple]", newIndex: 0 },
        { oldValue: "banana", oldIndex: 6, newValue: "[banana]", newIndex: 8 },
        {
          oldValue: "orange",
          oldIndex: 13,
          newValue: "[orange]",
          newIndex: 17,
        },
      ],
    });
  });

  it("returns indices with lookaround", () => {
    const result = Regex.replaceAllWithIndex(
      /(?<=,)\w/g,
      "ap#le,ban#na,ora#ge",
      "#"
    );

    expect(result).toEqual({
      str: "ap#le,#an#na,#ra#ge",
      replacements: [
        { oldValue: "b", oldIndex: 6, newValue: "#", newIndex: 6 },
        { oldValue: "o", oldIndex: 13, newValue: "#", newIndex: 13 },
      ],
    });
  });

  it("handle an empty string", () => {
    const result = Regex.replaceAllWithIndex(/\d+/g, "", "#");

    expect(result).toEqual({
      str: "",
      replacements: [],
    });
  });

  it("handle an empty RegExp", () => {
    const result = Regex.replaceAllWithIndex(/(?:)/g, "a", "#");

    expect(result).toEqual({
      str: "#a#",
      replacements: [
        { oldValue: "", oldIndex: 0, newValue: "#", newIndex: 0 },
        { oldValue: "", oldIndex: 1, newValue: "#", newIndex: 2 },
      ],
    });
  });

  it("handle a non-global regex", () => {
    expect(() => {
      Regex.replaceAllWithIndex(/\d+/, "123 abc 456 def", "X");
    }).toThrow(TypeError);
  });

  // it("PERFORMANCE_vanilla", () => {
  //     const text = "a".repeat(LENGTH);

  //     console.time("p");
  //     const result = text.replaceAll(/./g, "!");
  //     console.timeEnd("p");

  //     expect(result.length).toBe(LENGTH);
  // });

  // const LENGTH = 50000;
  // it("PERFORMANCE", () => {
  //     const text = "a".repeat(LENGTH);

  //     console.time("p");
  //     const result = RegexUtils.replaceAllWithIndex(/./g, text, "!");
  //     console.timeEnd("p");

  //     expect(result.replacements.length).toBe(LENGTH);
  // });
});

describe("getPatternErrorReason", () => {
  it("returns reason", () => {
    const message = getErrorMessageOfInvalidPattern() as string;
    expect(Regex.getRegExpSyntaxErrorReason(message)).toBe(
      "Unterminated character class"
    );
  });
});

/* eslint-disable no-invalid-regexp */
function getErrorMessageOfInvalidPattern() {
  try {
    new RegExp("[");
  } catch (error) {
    if (error instanceof SyntaxError) return error.message;
  }
  return "";
}
