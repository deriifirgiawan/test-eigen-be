export function longestWord(sentence: string): string {
	const words = sentence.split(" ");
	let longest = words[0];

	for (let word of words) {
		if (word.length > longest.length) {
			longest = word;
		}
	}

	return longest;
}
