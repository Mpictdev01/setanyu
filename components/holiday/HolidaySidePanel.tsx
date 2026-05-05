import React from "react";
import PixelText from "./PixelText";

interface HolidaySidePanelProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

// Fitur: TIDAK ADA Tombol Kontrol, Judul Rata Tengah
const HolidaySidePanel = ({
	title,
	children,
	className = "",
}: HolidaySidePanelProps) => {
	return (
		<div
			className={`window frutiger-aero-window ${className}`}
			style={{
				display: "flex",
				flexDirection: "column",
				background: "rgba(255, 255, 255, 0.08)",
				backdropFilter: "blur(25px)",
				WebkitBackdropFilter: "blur(25px)",
				borderRadius: "18px",
				boxShadow:
					"inset 0 1px 1px rgba(255,255,255,0.4), 0 8px 32px rgba(0,0,0,0.3)",
			}}>
			<div className="frutiger-aero-reflection" />
			{title && (
				<div
					className="title-bar"
					style={{
						borderTopLeftRadius: "18px",
						borderTopRightRadius: "18px",
						background:
							"linear-gradient(90deg, rgba(0,0,128,0.6), rgba(16,132,208,0.6))",
						position: "relative",
						zIndex: 10,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						paddingRight: "0px", // Override potential global padding
						paddingLeft: "0px",
						minHeight: "35px",
					}}>
					<div
						className="title-bar-text text-center w-full"
						style={{
							zIndex: 1,
							marginRight: "0px",
							marginLeft: "0px",
							padding: "0px",
						}}>
						{title
							.replace(
								/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
								""
							)
							.trim()}
					</div>
				</div>
			)}
			<div
				className="window-body"
				style={{
					margin: 0,
					padding: "4px",
					position: "relative",
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					background: "transparent",
					border: "none",
				}}>
				<div className="absolute inset-0 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-[0.15] mix-blend-overlay z-5"></div>
				<div className="relative z-20 w-full h-full flex-grow">{children}</div>
			</div>
		</div>
	);
};

export default HolidaySidePanel;
