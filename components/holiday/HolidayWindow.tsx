import React from "react";
import PixelText from "./PixelText";

interface HolidayWindowProps {
	children: React.ReactNode;
	title: string;
	className?: string;
	onClose?: () => void;
	hideControls?: boolean;
	bodyPadding?: string;
	hideCRT?: boolean;
	centerTitle?: boolean;
	icon?: string;
}

// Fitur: Ada Tombol Kontrol (Min/Max/Close)
const HolidayWindow = ({
	children,
	title,
	className = "",
	onClose,
	hideControls = false,
	bodyPadding = "12px",
	hideCRT = false,
	centerTitle = false,
	icon,
	hideTitleBar = false,
}: HolidayWindowProps & { hideTitleBar?: boolean }) => {
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
			{!hideTitleBar && (
				<div
					className="title-bar"
					style={{
						borderTopLeftRadius: "18px",
						borderTopRightRadius: "18px",
						background:
							"linear-gradient(90deg, rgba(0,0,128,0.6), rgba(16,132,208,0.6))",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						position: "relative",
						zIndex: 10,
						paddingTop: "8px",
						paddingBottom: "8px",
						minHeight: "35px",
						paddingLeft: "8px",
						paddingRight: "8px",
					}}>
					<div
						className={`flex items-center gap-2 text-white font-bold text-[11px] tracking-wide drop-shadow-md truncate w-full ${
							centerTitle ? "justify-center" : "justify-start"
						}`}
						style={{ zIndex: 1 }}>
						{icon && (
							<img
								src={icon}
								alt="icon"
								className="w-4 h-4 object-contain pixelated relative top-[1px]"
							/>
						)}
						<span className="truncate pixel-text relative top-[1px]">
							{title
								.replace(
									/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
									""
								)
								.trim()}
						</span>
					</div>
					{!hideControls && (
						<div
							className="title-bar-controls"
							style={{
								display: "flex",
								alignItems: "center",
								zIndex: 20,
								marginLeft: "8px",
							}}>
							<button aria-label="Minimize" />
							<button aria-label="Maximize" />
							<button aria-label="Close" onClick={onClose} />
						</div>
					)}
				</div>
			)}
			<div
				className="window-body"
				style={{
					margin: 0,
					padding: bodyPadding,
					position: "relative",
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					background: "transparent",
					border: "none",
				}}>
				{!hideCRT && (
					<div className="absolute inset-0 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-[0.15] mix-blend-overlay z-5"></div>
				)}
				<div className="relative z-20 w-full h-full flex-grow">{children}</div>
			</div>
		</div>
	);
};

export default HolidayWindow;
