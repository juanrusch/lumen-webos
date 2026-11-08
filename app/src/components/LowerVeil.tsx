import {useEffect, useRef} from 'preact/hooks';
import {watchBlurCanvas} from '../lib/blurCanvas';

/** The backdrop behind the lower rows: the strong blurred copy as a canvas (lib/blurCanvas.ts), so Down and Up do not raster it again.
 *  The picture is drawn by a child: Down and Up restyle the veil itself (its fade), and a restyled element repaints a gradient given through
 *  var() in full, which a child left alone does not (docs/research/frame-rate.md). */
export function LowerVeil () {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => (ref.current ? watchBlurCanvas(ref.current, ref.current, 'lowerveil--canvas') : undefined), []);
	return <div class="lowerveil"><div ref={ref} class="lowerveil__fill" /></div>;
}

/** The backdrop of Settings and the Guide, drawn from their screen's ::before into a canvas behind the content. Put it first in the screen. */
export function ScreenBackdrop () {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const el = ref.current;
		const screen = el && el.parentElement;
		return el && screen ? watchBlurCanvas(screen, el, 'screen--canvasbg', '::before') : undefined;
	}, []);
	return <div ref={ref} class="backdrop" />;
}
