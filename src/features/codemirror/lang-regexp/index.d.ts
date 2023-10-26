import {
  LRLanguage,
  LanguageSupport,
  HighlightStyle,
} from "@codemirror/language";
declare const regexpLanguage: LRLanguage;
declare const regexpHighlightStyle: HighlightStyle;
declare function regexp(): LanguageSupport;
export { regexpLanguage, regexpHighlightStyle, regexp };
