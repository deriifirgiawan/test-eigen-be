import { longestWord } from "../longestWord";
import { expect, test } from "@jest/globals";

test("longestWord", () => {
	const sentence = "Saya sangat senang mengerjakan soal algoritma";
	const result = longestWord(sentence);
	expect(result).toBe("mengerjakan");
});
