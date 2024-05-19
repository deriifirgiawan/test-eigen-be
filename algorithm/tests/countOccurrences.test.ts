import { diagonalDifference } from "../diagonalDifference";
import { expect, test } from "@jest/globals";

test("diagonalDifference", () => {
	const matrix = [
		[1, 2, 0],
		[4, 5, 6],
		[7, 8, 9],
	];
	const result = diagonalDifference(matrix);
	expect(result).toBe(3);
});
