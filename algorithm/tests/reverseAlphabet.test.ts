import { reverseAlphabet } from "../reverseAlphabet";
import { expect, test } from "@jest/globals";

test("reverseAlphabet", () => {
	const result = reverseAlphabet("NEGIE1");
	expect(result).toBe("EIGEN1");
});
