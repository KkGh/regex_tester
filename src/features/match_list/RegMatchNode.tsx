import { memo, useCallback, useContext } from "react";
import { Range } from "../shared/Range";
import { HoverItemDispatch } from "../shared/hoverItemReducer";
import { PreText } from "./PreText";

type Props = {
  title: string;
  start: number;
  end: number;
  text: string;
  onClick?: (range: Range) => void;
  titleColor?: string;
};

export const RegMatchNode = memo((props: Props) => {
  const { title, start, end, text, onClick, titleColor = "" } = props;
  const dispatch = useContext(HoverItemDispatch);

  const handleClick = useCallback(() => {
    onClick?.({ start: start, end: end });
  }, [start, end, onClick]);

  const handleMouseEnter = useCallback(() => {
    dispatch({ type: "enter", newItem: { start: start, end: end } });
  }, [dispatch, start, end]);

  const handleMouseleave = useCallback(() => {
    dispatch({ type: "leave" });
  }, [dispatch]);

  return (
    <div>
      <div className={`small`} style={{ color: titleColor }}>
        <span
          role="button"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseleave}
        >
          {`${title} [${start}-${end}]`}
        </span>
      </div>
      <PreText tabSize={4} text={text} />
    </div>
  );
});

RegMatchNode.displayName = "RegMatchNode";