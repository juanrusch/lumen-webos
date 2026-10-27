/** Shrinks a box's text a pixel at a time, down to two thirds of its size, until it fits the box's width; past that it may wrap.
 *  A centred box with overflow hidden cuts a word wider than itself at both ends ("Kunskapskanalen" read "unskapskanale").
 *  Each step reads the layout, so call it when the box is drawn and once the font has loaded, not on every render. */
export function fitText (box: HTMLElement | null): void {
	if (!box) return;
	box.style.fontSize = '';
	box.style.wordBreak = '';
	const base = parseFloat(getComputedStyle(box).fontSize);
	const min = Math.round(base * 0.66);
	let size = base;
	while (box.scrollWidth > box.clientWidth + 1 && size > min) {
		size -= 1;
		box.style.fontSize = `${size}px`;
	}
	if (box.scrollWidth > box.clientWidth + 1) box.style.wordBreak = 'break-word';
}
