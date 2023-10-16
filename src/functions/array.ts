export const range = (count: number): number[] => {
    return Array(count).fill(0).map((_, i) => i);
};

// 配列の全通りのペアを返すGeneratorを作成する。
// O(N^2) でメモリ消費が激しくなるため配列を使用しない。
export function* pairwise<T>(array: T[]): Generator<[T, T], void, unknown> {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            yield [array[i], array[j]];
        }
    }
}

export const groupBy = <K, T>(array: T[], keySelector: (item: T) => K): Map<K, T[]> => {
    return array.reduce((groups, item) => {
        const key = keySelector(item);
        const group = groups.get(key) || [];
        group.push(item);
        groups.set(key, group);
        return groups;
    }, new Map<K, T[]>());
};

// 配列の隣り合う要素を、条件に基づいてグループ化する。
export const groupByAdjacency = <K, T>(array: T[], keySelector: (item: T) => K)
    : { key: K, items: T[] }[] => {
    return array.reduce((groups, item) => {
        const key = keySelector(item);
        const lastGroup = groups[groups.length - 1];
        if (lastGroup && lastGroup.key === key) {
            lastGroup.items.push(item);
        }
        else {
            groups.push({ key, items: [item] });
        }
        return groups;
    }, new Array<{ key: K, items: T[] }>());
};

