import { render, screen } from "@testing-library/react";
import { VirtuosoProps } from "react-virtuoso";
import { Regex } from "../regex/Regex";
import { RegMatchList } from "./RegMatchList";

jest.mock("react-virtuoso", () => {
  // Virtuosoをモック化
  // 参考：https://github.com/petyosi/react-virtuoso/issues/26
  const MockedVirtuoso = (props: VirtuosoProps<unknown, unknown>) => {
    const { Virtuoso } = jest.requireActual("react-virtuoso");
    return <Virtuoso initialItemCount={props?.totalCount} {...props} />;
  };
  return { Virtuoso: MockedVirtuoso };
});

describe("MatchList", () => {
  it("show matches", async () => {
    render(
      <RegMatchList matchList={Regex.matches(/\w+/dg, "apple,banana,orange")} />
    );

    expect(await screen.findByText("apple")).toBeInTheDocument();
    expect(screen.getByText("banana")).toBeInTheDocument();
    expect(screen.getByText("orange")).toBeInTheDocument();
  });

  it("show matches and its groups", async () => {
    render(
      <RegMatchList
        matchList={Regex.matches(/(\w+)(\d)/dg, "apple1,banana2")}
      />
    );

    expect(await screen.findByText("apple1")).toBeInTheDocument();
    expect(screen.getByText("apple")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("banana2")).toBeInTheDocument();
    expect(screen.getByText("banana")).toBeInTheDocument();
    expect(screen.getByText("banana2")).toBeInTheDocument();
  });

  it("show start/end index", async () => {
    render(
      <RegMatchList
        matchList={Regex.matches(/banana/dg, "apple,banana,orange")}
      />
    );
    expect(await screen.findByText(/\[6-12\]/)).toBeInTheDocument();
  });
});
