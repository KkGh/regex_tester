import { memo } from "react";
import { Table } from "react-bootstrap";

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet

const characterClasses = [
  ["[xyz] [a-c]", "囲んだ文字のいずれか"],
  ["[^xyz] [^a-c]", "囲まれていない文字の全て"],
  [".", "改行文字を除く1文字"],
  ["\\d", "数字"],
  ["\\D", "\\d以外の文字"],
  ["\\w", "アンダースコアを含む半角英数字"],
  ["\\W", "\\w以外の文字"],
  ["\\s", "空白、タブ、改ページ、改行などの空白文字"],
  ["\\S", "\\s以外の文字"],
  ["\\t", "水平タブ"],
  ["\\r", "復帰文字"],
  ["\\n", "行送り文字"],
  ["\\v", "垂直タブ"],
  ["\\f", "改ページ"],
  ["[\\b]", "バックスペース"],
  ["\\0", "NULL文字"],
  ["\\cX", 'キャレット記法を使用した制御文字："\\X"にはA-Zの文字が入ります'],
  ["\\xhh", "2桁の16進数文字コード"],
  ["\\uhhhh", "4桁の16進数ユニコード文字"],
  [
    "\\u{hhhh} \\u{hhhhh}",
    "16進数ユニコード文字（uフラグがセットされた時のみ）",
  ],
  ["x|y", '論理和："x" または "y"'],
  ["\\", "エスケープ：\\^$.*+?()[]{}"],
];

const bounaryAssertions = [
  ["^", "入力の先頭に一致"],
  ["$", "入力の末尾に一致"],
  ["\\b", "単語の区切りに一致"],
  ["\\B", "単語以外の境界に一致"],
];

const otherAssertions = [
  ["x(?=y)", "先読みアサーション"],
  ["x(?!y)", "否定先読みアサーション"],
  ["(?<=y)x", "後読みアサーション"],
  ["(?<!y)x", "否定後読みアサーション"],
];

const groupsAndBackreferences = [
  ["(x)", "キャプチャグループ：$1～$9を使ってアクセスできます"],
  ["(?<Name>x)", "名前付きキャプチャグループ"],
  ["(?:x)", "非キャプチャグループ"],
  ["\\n", "n番目の括弧の部分に一致した部分文字列への後方参照"],
  [
    "\\k<Name>",
    "<Name>で指定された名前付きキャプチャグループに一致した部分文字列への後方参照",
  ],
];

const quantifiers = [
  ["x*", "0回以上の繰り返し"],
  ["x+", "1回以上の繰り返し"],
  ["x?", "0回か1回の出現"],
  ["x{n}", "ちょうどn回の出現"],
  ["x{n,}", "少なくともn回以上の出現"],
  ["x{n,m}", "少なくともn回、多くてもm回の出現"],
  ["x*? x+? x?? x{n}? x{n,}? x{n,m}?", "最短マッチ"],
];

const unicodeProperty = [
  ["\\p{...}", "ユニコードプロパティで指定された文字"],
  ["\\P{...}", "\\p{...}に一致しない文字"],
  [
    "\\p{name=value}",
    "ユニコードプロパティ名とユニコードプロパティ値で指定された文字",
  ],
  ["\\P{name=value}", "\\p{name=value}に一致しない文字"],
];

const replacement = [
  ["$$", "$を挿入"],
  ["$&", "一致した部分文字列を挿入"],
  ["$`", "一致した部分文字列の直前の文字列を挿入"],
  ["$'", "一致した部分文字列の直前の文字列を挿入"],
  ["$n", "n番目のキャプチャグループ。nは100未満の正の整数です。"],
  ["$<Name>", "キャプチャグループに名前を指定します。"],
];

const createTable = (list: string[][], title: string, description?: string) => {
  return (
    <div>
      <h6>{title}</h6>
      <div style={{ fontSize: "0.8rem" }}>
        {description || <div>{description}</div>}
        <Table bordered striped size="sm">
          {/* <thead>
          <th>文字</th><th>意味</th>
        </thead> */}
          <tbody>
            {list.map((r) => (
              <tr key={r[0]}>
                <td width={80}>{r[0]}</td>
                <td>{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export const RegCheetSheet = memo(() => {
  return (
    <section className="info h-100">
      <div className="h-100 p-2 overflow-auto">
        {/* {range(100).map(_ => <div>test</div>)} */}

        {createTable(characterClasses, "文字クラス")}
        {createTable(bounaryAssertions, "境界型アサーション")}
        {createTable(otherAssertions, "その他のアサーション")}
        {createTable(groupsAndBackreferences, "グループと後方参照")}
        {createTable(quantifiers, "数量詞")}
        {createTable(
          unicodeProperty,
          "ユニコード文字プロパティ",
          "uフラグが必要です。"
        )}
        {createTable(
          replacement,
          "特殊な置換パターン",
          "replaceで使用します。"
        )}
      </div>
    </section>
  );
});
