// Regular expression suggester

import { Diff, diff_match_patch } from "diff-match-patch";
import { groupByAdjacency } from "../../functions/array";

/**
 * 全ての文字列にマッチする文字クラスを返す。
 */
const specifyCharClass = (list: string[]): string => {
    const index = list.indexOf("");
    if (index >= 0) throw new Error(`list contains empty string at ${index}`);

    // 文字クラス一覧（一般的でないものは除く）
    const charClasses = [
        "\\d",  // [0-9]
        "\\w",  // [0-9a-zA-Z_]
        "\\t",
        "\\n",
        "\\s",  // [ \t\n\r\f\v]
        "\\S",  // [ \t\n\r\f\v]以外
        ".",    // \n以外
        "[\\s\\S]"  // 全て
    ];

    for (const c of charClasses) {
        if (list.every(s => s.match(`^${c}+$`))) {
            return c;
        }
    }

    // ここまでは来ないはず
    throw new Error("no character classes matched");
};

export const suggestFromText = (text1: string, text2: string): RegExp => {
    const dmp = new diff_match_patch(); // 毎回newするのはパフォーマンス的に良くない？
    const diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);
    
    // BUG: 稀に empty diff が含まれていることがある
    // https://github.com/google/diff-match-patch/issues/105
    const validDiffs = diffs.filter(d => d[1] !== "");

    return suggest(validDiffs);
}

/**
 * 差分配列から正規表現を作成する。
 */
export const suggest = (diffs: Diff[]): RegExp => {
    const array: string[] = [];
    const diffGroups = groupByAdjacency(diffs, d => d[0] === 0 ? "equality" : "diff");
    // console.log(diffGroups);

    for (const group of diffGroups) {
        const diffs = group.items;

        // 等しい(0)場合、そのまま追加
        if (group.key === "equality") {
            array.push(escapeMetaChar(diffs[0][1]));
        }
        else {
            // 挿入(1)・削除(-1)・置換(-1,1)の場合、キャプチャグループを追加
            const blocks = diffs.map(d => d[1]);
            const charClass = specifyCharClass(blocks);
            const isReplacement = diffs.length > 1;

            // 置換の場合は両方のテキストに部分文字列が存在するため + を、
            // 挿入・削除の場合はいずれかにのみ部分文字列が存在するため * を使用する。
            const quantifier = isReplacement ? "+?" : "*?";
            array.push(`(${charClass}${quantifier})`);
        }
    }

    return new RegExp(array.join(""), "g"); // フラグはとりあえずgだけで良い？
}

export const escapeMetaChar = (s: string): string => {
    return s.replaceAll(/[\^$.*+?()[\]{}]/g, match => {
        return "\\" + match;
    });
};
