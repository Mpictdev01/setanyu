import React from "react";

interface PixelTextProps {
	children: React.ReactNode;
	size?: string;
	className?: string;
	noStroke?: boolean;
	color?: string;
}

const PixelText = ({
	children,
	size = "text-xl",
	className = "",
	noStroke = false,
	color,
}: PixelTextProps) => {
	return (
		<h3
			className={`${size} font-black tracking-wider uppercase ${className} ${
				color ? "" : "text-white"
			}`}
			style={{
				fontFamily: 'var(--font-press-start-2p), "Press Start 2P", monospace',
				WebkitTextStroke: noStroke ? "none" : "1.5px black",
				textShadow: noStroke ? "none" : "3px 3px 0 #000",
				color: color || "inherit",
			}}>
			{children}
		</h3>
	);
};

export default PixelText;
