// エスケープシーケンスを示す文字列をエスケープシーケンスへ変換する
export function convertEscapeSequence(str: string) {
  // 名前は暫定
  return str.replaceAll("\\t", "\t").replaceAll("\\n", "\n");
}

// HTML文字列をエスケープする。
export function escapeHtml(s: string) {
  return s.replace(/[<>&"'`]/g, (match) => {
    return (
      {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;",
      }[match] ?? ""
    );
  });
}

export function countCaptureGroup(reg: RegExp, text: string) {
  // exec()は副作用があるため RegExp をコピーしてから実行
  const l = new RegExp(reg).exec(text)?.length;
  return l ? l - 1 : 0;
}
