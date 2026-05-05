"use client";

import React from "react";

interface MusicControlsProps {
	onVolumeDown: () => void;
	onMute: () => void;
	onVolumeUp: () => void;
	isMuted: boolean;
}

const MusicControls = ({
	onVolumeDown,
	onMute,
	onVolumeUp,
	isMuted,
}: MusicControlsProps) => {
	const buttonStyle = {
		width: "40px",
		height: "40px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		minWidth: "auto",
		cursor: "pointer",
	};

	return (
		<div className="w-full flex items-center justify-center gap-3">
			{/* Volume Down Button */}
			<button
				onClick={onVolumeDown}
				className="standard-98-button"
				style={buttonStyle}
				aria-label="Volume Down">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="black">
					<path d="M3 6v4h3l4 4V2L6 6H3z" />
					<path
						d="M11 7v2"
						stroke="black"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			</button>

			{/* Mute Button */}
			<button
				onClick={onMute}
				className="standard-98-button"
				style={buttonStyle}
				aria-label={isMuted ? "Unmute" : "Mute"}>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="black">
					{isMuted ? (
						<path d="M6 4l6 4-6 4V4z" />
					) : (
						<>
							<rect x="5" y="4" width="2" height="8" />
							<rect x="9" y="4" width="2" height="8" />
						</>
					)}
				</svg>
			</button>

			{/* Volume Up Button */}
			<button
				onClick={onVolumeUp}
				className="standard-98-button"
				style={buttonStyle}
				aria-label="Volume Up">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="black">
					<path d="M3 6v4h3l4 4V2L6 6H3z" />
					<path
						d="M11 6c0-1 0.5-2 2-2M11 10c0 1 0.5 2 2 2"
						stroke="black"
						strokeWidth="1.5"
						strokeLinecap="round"
						fill="none"
					/>
				</svg>
			</button>
		</div>
	);
};

export default MusicControls;