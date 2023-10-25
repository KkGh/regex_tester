import { escapeHtml } from "../../functions/util";
import styles from "./PreText.module.css";

type Props = {
  text: string;
  tabSize?: number;
};

export const PreText = ({ text, tabSize = 4 }: Props) => {
  // 元々の文字列をエスケープした後、<span>要素を挿入して空白文字を可視化する
  const escaped = escapeHtml(text);
  const html = markWhiteSpaces(escaped);

  if (html) {
    return (
      <div
        style={{ tabSize }}
        className={`${styles.pretext}`}
        dangerouslySetInnerHTML={{ __html: html }}
        data-testid="pretext"
      ></div>
    );
  } else {
    return (
      <div className="fst-italic text-secondary">
        <small>(empty)</small>
      </div>
    );
  }
};

/**
 * 空白文字（半角スペース、タブ文字\t、改行文字\n）をspan要素で囲み、それぞれに
 * cssクラス（.pt-space, .pt-tab, .pt-linebreak）を割り当てる。
 */
function markWhiteSpaces(plainText: string): string {
  return plainText.replaceAll(/\s/g, (s) => {
    if (s === " ") {
      return `<span class='${styles.space}'> </span>`;
    } else if (s === "\t") {
      return `<span class='${styles.tab}'>	</span>`;
    } else if (s === "\n") {
      return `<span class='${styles.linebreak}'>\n</span>`;
    } else {
      return s;
    }
  });
}
