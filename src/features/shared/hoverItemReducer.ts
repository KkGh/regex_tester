import { Dispatch, createContext } from "react";
import { Range } from "./Range";

type HoverItemState = {
  item?: Range;
};

type HoverItemAction = {
  type: "enter",
  newItem: Range;
} | {
  type: "leave";
};

// reducer関数はステートとアクションを受け取り、新しいステートを返す
export const hoverItemReducer = (state: HoverItemState, action: HoverItemAction)
  : HoverItemState => {
  switch (action.type) {
    case "enter":
      return { item: action.newItem };
    case "leave":
      return { item: undefined };
    default:
      return state;
  }
};

export const HoverItemDispatch = createContext<Dispatch<HoverItemAction>>(() => {
  throw new Error("HoverItemDispatch context must be provided");
});