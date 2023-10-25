import { fireEvent, render, screen } from "@testing-library/react";
import { RegSuggest } from "./RegSuggest";

describe("RegSuggest", () => {
  it("shows the suggestions", async () => {
    const callback = jest.fn();
    const text = `apple123, appleABC, apple`;
    const matches = [...text.matchAll(/\w+/dg)].map((m) => m[0]);
    render(
      <RegSuggest matches={matches} text={text} onClickSuggestion={callback} />
    );

    const items = await screen.findAllByRole("button");
    const item = items[0];
    expect(item).toBeInTheDocument();

    fireEvent.click(item);
    expect(callback).toBeCalled();
  });
});
