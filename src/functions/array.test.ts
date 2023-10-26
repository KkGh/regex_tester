import { groupBy, groupByAdjacency, pairwise } from "./array";

describe("groupByAdjacency", () => {
  it("converts array to groups by keySelector", () => {
    const array = [0, 1, 1, 2, 0, 0];
    const groups = groupByAdjacency(array, (item) => item);
    expect(groups).toEqual([
      { key: 0, items: [0] },
      { key: 1, items: [1, 1] },
      { key: 2, items: [2] },
      { key: 0, items: [0, 0] },
    ]);
  });

  it("converts array to a group by same key", () => {
    const array = [0, 1, 1, 2, 0, 0];
    const groups = groupByAdjacency(array, (item) => true);
    expect(groups).toEqual([{ key: true, items: array }]);
  });

  it("accepts empty array", () => {
    const array: any[] = [];
    const groups = groupByAdjacency(array, (item) => item);
    expect(groups).toEqual([]);
  });
});

describe("pairwise", () => {
  it("returns n*(n-1)/2", () => {
    const n = 100;
    const pairs = pairwise(Array.from({ length: n }, (_, i) => i));
    expect(Array.from(pairs).length).toBe((n * (n - 1)) / 2);
  });
});

describe("groupby", () => {
  it("returns groups by keySelector", () => {
    const records = [
      { player: "a", team: "red", score: 10 },
      { player: "b", team: "blue", score: 3 },
      { player: "c", team: "red", score: 4 },
      { player: "d", team: "green", score: 15 },
    ];
    const groups = groupBy(records, (v) => v.team);
    expect(groups.size).toBe(3);
    expect(groups.get("red")).toHaveLength(2);
    expect(groups.get("green")).toHaveLength(1);
    expect(groups.get("blue")).toHaveLength(1);
  });
});
