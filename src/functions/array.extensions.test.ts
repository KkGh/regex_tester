import './array.extensions';

const people = [
    {
        name: "alice",
        age: 10
    },
    {
        name: "bob",
        age: 12
    },
    {
        name: "code",
        age: 15
    },
];

describe('Array extensions', () => {
    describe('sum', () => {
        test('should return the sum of numbers in the array', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(arr.sum()).toBe(15);
        });

        test('should return 0 for an empty array', () => {
            const arr: number[] = [];
            expect(arr.sum()).toBe(0);
        });
    });

    describe('maxby', () => {
        test('should return the max of numbers in the array', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(arr.maxBy(v => v)).toBe(5);
        });

        test('should return null for an empty array', () => {
            const arr: [] = [];
            expect(() => arr.maxBy(v => v)).toThrow();
        });

        test('should return the name of max age person in the array', () => {
            expect(people.maxBy(v => v.age).name).toBe("code");
        });
    });

    describe('minby', () => {
        test('should return the min of numbers in the array', () => {
            const arr = [1, 2, 3, 4, 5];
            expect(arr.minBy(v => v)).toBe(1);
        });

        test('should throw for an empty array', () => {
            const arr: [] = [];
            expect(() => arr.minBy(v => v)).toThrow();
        });

        test('should return the name of min age person in the array', () => {
            expect(people.minBy(v => v.age).name).toBe("alice");
        });
    });

});