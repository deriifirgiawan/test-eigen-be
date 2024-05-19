export function diagonalDifference(matrix: number[][]): number {
	let primaryDiagonal = 0;
	let secondaryDiagonal = 0;
	const size = matrix.length;

	for (let i = 0; i < size; i++) {
		primaryDiagonal += matrix[i][i];
		secondaryDiagonal += matrix[i][size - 1 - i];
	}

	return Math.abs(primaryDiagonal - secondaryDiagonal);
}
