import { useCallback, useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { pairwise } from "../../functions/array";
import { take } from "../../functions/generator";
import { suggestFromText } from "./regest";

type Props = {
  matches: string[];
  text: string;
  onClickSuggestion?: (pattern: string) => void;
};

type SuggestedListItem = {
  regexp: RegExp;
  count: number;
};

const SUGGESTION_LIMIT = 100;

export const RegSuggest = ({ text, matches, onClickSuggestion }: Props) => {
  const [suggestions, setSuggestedList] = useState<SuggestedListItem[]>([]);

  useEffect(() => {
    const uniqueSuggestions = suggestPatterns(matches, text, SUGGESTION_LIMIT);
    setSuggestedList(uniqueSuggestions);
  }, [text, matches]);

  const handleClick = useCallback((pattern: string) => {
    onClickSuggestion?.(pattern);
  }, [onClickSuggestion]);

  return (
    <div>
      <p>Suggets RegExp patterns from current matches.</p>

      {matches.length === 0 ? <div className="text-secondary">no matches</div> :
        <>
          <p>{suggestions.length} suggestions:</p>
          <ListGroup>
            {suggestions.map((item, i) => (
              <ListGroupItem
                key={i}
                action
                onClick={() => handleClick(item.regexp.source)}
              >
                <p>
                  <span className="fw-bold">{item.count}</span>
                  <span className="text-secondary small"> matches in Text</span>
                </p>
                <p className="small">
                  {item.regexp.source}
                </p>
              </ListGroupItem>
            ))
            }
          </ListGroup>
        </>}

    </div>
  );
};

function suggestPatterns(matches: string[], text: string, limit: number) {
  // O(N^2) のペアができるため個数制限する
  const pairs = [...take(pairwise(matches), limit)];

  const patterns = pairs.map(pair => suggestFromText(pair[0], pair[1]).source);

  const uniqueSuggestions = [...new Set(patterns)]  // 重複排除
    .map(p => {
      const r = new RegExp(p, "g");
      return {
        regexp: r,
        count: [...text.matchAll(r)].length,
      };
    })
    .sort((a, b) => b.count - a.count); // マッチ回数で降順ソート

  return uniqueSuggestions;
}
