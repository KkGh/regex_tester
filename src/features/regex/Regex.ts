import { GetSubstitution } from "../../functions/GetSubstitution";

// 移植性を考慮し、正規表現に関するロジックはこのファイルに集約する

export type CaptureGroup = {
  // キャプチャグループが一致しない場合、undefinedの代わりに空文字を格納する。
  text: string;
  start: number;
  end: number;

  // キャプチャグループ内のインデックス。1以上の値
  groupIndex: number;
};

export type Match = {
  text: string;
  start: number;
  end: number;

  // matchAll()におけるこのマッチ結果のインデックス。
  matchIndex: number;
  groups: CaptureGroup[];
};

export type ReplacementResult = {
  str: string;
  replacements: {
    oldIndex: number;
    oldValue: string;
    newIndex: number;
    newValue: string;
  }[];
};

export class Regex {
  /**
   * String.matchAllのラッパーです。
   * gフラグが存在する場合はString.matchAllの結果を返します。
   * gフラグが存在しない場合はString.matchを実行し、最初の一致のみを含む配列または空配列を返します。
   */
  static doMatch(input: string, regexp: RegExp): RegExpMatchArray[] {
    if (regexp.global) {
      return [...input.matchAll(regexp)];
    } else {
      const m = input.match(regexp);
      return m !== null ? [m] : [];
    }
  }

  static matches(r: RegExp, input: string): Match[];
  static matches(matches: RegExpMatchArray[]): Match[];

  static matches(arg1: RegExpMatchArray[] | RegExp, arg2?: string): Match[] {
    if (arg1 instanceof RegExp && typeof arg2 === "string") {
      const matches = Regex.doMatch(arg2, arg1);
      return this.matchesFromMatchResult(matches);
    } else if (arg1 instanceof Array) {
      return this.matchesFromMatchResult(arg1);
    }
    throw new Error("invalid arguments");
  }

  private static matchesFromMatchResult(matches: RegExpMatchArray[]): Match[] {
    // TODO:index非対応ブラウザ対応
    // 空の正規表現パターン /(?:)/g が指定された場合、一致文字列の長さは0になる。
    let matchResults: Match[] = matches.map((m, i) => {
      // キャプチャグループ
      // indicesプロパティを使うには tsconfig で lib に ES2022.RegExp を追加し、正規表現パターンに dフラグをセットする。
      const groups: CaptureGroup[] = [];
      for (let j = 1; j < m.length; j++) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group
        // キャプチャグループが文字列をキャプチャしなかった場合、
        // 一致したテキスト及び開始・終了インデックスはundefinedとなる。
        // 例1（論理和|）:
        //   /(ab)|(cd)/.exec("ab")
        //   => ['ab', 'ab', undefined]
        // 例2（数量指定子?）:
        //   /(c)?/.exec("ab")
        //   => ['', undefined]
        groups.push({
          text: m[j] ?? "",
          start: m.indices?.[j]?.[0] || 0,
          end: m.indices?.[j]?.[1] || 0,
          groupIndex: j,
        });
      }

      return {
        text: m[0],
        start: m.indices?.[0]?.[0] || 0,
        end: m.indices?.[0]?.[1] || 0,
        matchIndex: i,
        groups,
      };
    });

    return matchResults;
  }

  static replace(r: RegExp, input: string, replaceValue: string): string {
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    // $& で一致した文字列を挿入
    // $1, $2, ... でキャプチャグループを挿入
    // $` で一致した文字列より前の文字列を挿入
    // $' で一致した文字列より後の文字列を挿入
    // $<Name> で指定された名前のキャプチャグループを挿入
    return input.replace(r, replaceValue);
  }

  static extract(r: RegExp, input: string, outputPattern: string): string;
  static extract(matches: RegExpMatchArray[], outputPattern: string): string;

  static extract(
    arg1: RegExpMatchArray[] | RegExp,
    arg2: string,
    arg3?: string
  ): string {
    if (
      arg1 instanceof RegExp &&
      typeof arg2 === "string" &&
      typeof arg3 === "string"
    ) {
      const matches = Regex.doMatch(arg2, arg1);
      return Regex.extractFromMatchResult(matches, arg3);
    } else if (arg1 instanceof Array && typeof arg2 === "string") {
      return this.extractFromMatchResult(arg1, arg2);
    }
    throw new Error("invalid arguments");
  }

  private static extractFromMatchResult(
    matches: RegExpMatchArray[],
    outputPattern: string
  ) {
    let result = "";

    for (const m of matches) {
      let output = outputPattern;

      // $&を一致した文字列に置換
      output = output.replaceAll("$&", m[0]);

      // $1, $2, ...をキャプチャ文字列に置換
      for (let i = 1; i < m.length; i++) {
        output = output.replaceAll("$" + i, m[i] ?? "");
      }

      result += output;
    }
    return result;
  }

  static replaceAllWithIndex(
    re: RegExp,
    str: string,
    replaceValue: string
  ): ReplacementResult;
  static replaceAllWithIndex(
    matches: RegExpMatchArray[],
    str: string,
    replaceValue: string
  ): ReplacementResult;

  /*
   * 正規表現に一致したすべての文字列を replaceValue で置き換えた新しい文字列と、
   * それぞれの replaceValue の文字列及び開始位置を返します。
   */
  static replaceAllWithIndex(
    arg1: RegExp | RegExpMatchArray[],
    str: string,
    replaceValue: string
  ) {
    if (arg1 instanceof RegExp) {
      if (!arg1.global)
        throw new TypeError(
          `${Regex.replaceAllWithIndex.name} called with a non-global RegExp argument`
        );
      const matches = Regex.doMatch(str, arg1);
      return Regex.replaceAllWithIndexFromMatchResult(
        matches,
        str,
        replaceValue
      );
    } else {
      return Regex.replaceAllWithIndexFromMatchResult(arg1, str, replaceValue);
    }
  }

  private static replaceAllWithIndexFromMatchResult(
    matches: RegExpMatchArray[],
    str: string,
    replaceValue: string
  ) {
    let result = "";
    const replacements = [];
    let lastMatchEnd = 0;
    for (const m of matches) {
      const matched = m[0];
      const position = m.index!;
      const captures = m.slice(1);
      const replacement = GetSubstitution(
        matched,
        str,
        position,
        captures,
        m.groups,
        replaceValue
      );

      result += str.slice(lastMatchEnd, position);
      const replacementStart = result.length;
      result += replacement;
      lastMatchEnd = position + matched.length;

      replacements.push({
        oldIndex: position,
        oldValue: matched,
        newIndex: replacementStart,
        newValue: replacement,
      });
    }

    result += str.slice(lastMatchEnd);

    return { str: result, replacements };
  }

  static getRegExpSyntaxErrorReason(message: string): string;
  static getRegExpSyntaxErrorReason(error: SyntaxError): string;
  static getRegExpSyntaxErrorReason(
    errorOrMessage: string | SyntaxError
  ): string {
    const message =
      errorOrMessage instanceof SyntaxError
        ? errorOrMessage.message
        : errorOrMessage;
    const r = /Invalid regular expression: (.+): (.+)/;
    return r.exec(message)![2];
  }
}
