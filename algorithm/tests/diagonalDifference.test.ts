import { countOccurrences } from "../countOccurrences";
import { expect, test } from "@jest/globals";

test("countOccurrences", () => {
	const input = ["xc", "dz", "bbb", "dz"];
	const query = ["bbb", "ac", "dz"];
	const result = countOccurrences(input, query);
	expect(result).toEqual([1, 0, 2]);
});
