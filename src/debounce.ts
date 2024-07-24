/**
 * @param func - function to debounce.
 * @param delay - debounce delay in milliseconds.
 * @returns A debounced version of the input function.
 */
function debounce<T extends (...args: string[]) => void>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	return function (...args: Parameters<T>) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
}

export default debounce;
