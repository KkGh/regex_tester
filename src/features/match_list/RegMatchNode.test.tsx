import { render, screen } from "@testing-library/react";
import { RegMatchNode } from "./RegMatchNode";

describe("RegMatchListItem", () => {
  it("shows its title range", () => {
    render(<RegMatchNode title={"title"} start={0} end={3} text={"sample"} />);
    const title = screen.getByText(/title/);
    const range = screen.getByText(/\[0-3\]/);
    const text = screen.getByText("sample");

    expect(title).toBeInTheDocument();
    expect(range).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
