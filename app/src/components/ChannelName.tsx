import {useLayoutEffect, useRef} from 'preact/hooks';
import {useFontsReady} from '../hooks/useFontsReady';
import {fitText} from '../lib/fitText';

interface Props {
	/** the box's class: chan__name on a tile, guide__logo or fg__logo for a plate in the guides */
	cls: string;
	name: string;
	/** the channel's brand colour, for a plate */
	color?: string;
	/** the plates put the name in a span, for its padding */
	span?: boolean;
}

/** A channel's name drawn in place of its logo, shrunk to fit its box (lib/fitText.ts) when drawn and again once the font has loaded. */
export function ChannelName ({cls, name, color, span}: Props) {
	const box = useRef<HTMLDivElement>(null);
	const fontsReady = useFontsReady();
	useLayoutEffect(() => fitText(box.current), [name, fontsReady]);
	return <div ref={box} class={cls} style={color ? {backgroundColor: color} : undefined}>{span ? <span>{name}</span> : name}</div>;
}
