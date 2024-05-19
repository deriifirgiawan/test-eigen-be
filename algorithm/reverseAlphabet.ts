export function reverseAlphabet(input: string): string {
	const letters = input.replace(/[0-9]/g, "").split("").reverse().join("");
	const numbers = input.replace(/[^0-9]/g, "");
	return letters + numbers;
}
