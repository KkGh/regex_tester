import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { Range } from "../shared/Range";
import { Match } from "../regex/Regex";
import { RegMatch } from "./RegMatch";

type Props = {
  matchList: Match[];
  onItemClick?: (range: Range) => void;
}

export const RegMatchList = memo(({ matchList, onItemClick }: Props) => {
  return (
    <section className="matchlist h-100">
      <Virtuoso
        className="h-100"
        totalCount={matchList.length}
        itemContent={index =>
          <RegMatch
            value={matchList[index]}
            onClick={onItemClick}
          />
        }
      />
    </section>
  );
});

RegMatchList.displayName = "RegMatchList";
