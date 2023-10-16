import { memo } from "react";
import { colorGroup, colorMatch } from "../../theme";
import { Match } from "../regex/Regex";
import { Range } from "../shared/Range";
import { RegMatchNode } from "./RegMatchNode";

type Props = {
  value: Match;
  onClick?: (range: Range) => void;
};

export const RegMatch = memo(({ value, onClick }: Props) => {
  return (
    <div className="border-top border-bottom px-3">
      <div className="py-2">
        <RegMatchNode
          title={`Match ${value.matchIndex}`}
          start={value.start}
          end={value.end}
          text={value.text}
          onClick={onClick}
          titleColor={colorMatch}
        />
      </div>

      {value.groups.length > 0 &&
        <div>
          {value.groups.map((group) =>
            <div
              key={group.groupIndex}
              className="py-2"
            >
              <RegMatchNode
                title={`Group ${group.groupIndex}`}
                start={group.start}
                end={group.end}
                text={group.text}
                onClick={onClick}
                titleColor={colorGroup}
              />
            </div>
          )}
        </div>
      }
    </div>
  );
});

RegMatch.displayName = "RegMatch";