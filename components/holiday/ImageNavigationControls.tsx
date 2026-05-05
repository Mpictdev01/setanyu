"use client";

import React from "react";

interface ImageNavigationControlsProps {
	onPrevious: () => void;
	onHome: () => void;
	onNext: () => void;
}

const ImageNavigationControls = ({
	onPrevious,
	onHome,
	onNext,
}: ImageNavigationControlsProps) => {
	return (
		<div className="w-full flex items-center justify-center gap-3">
			{/* Previous Button */}
			<div
				onClick={onPrevious}
				className="group relative flex items-center justify-center w-12 h-12 cursor-pointer active:scale-95 transition-transform duration-100"
				style={{
					backgroundColor: "#2E8B57",
					backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #226640 2px, #226640 4px)`,
					border: "2px solid #000000",
					borderRadius: "12px",
					boxShadow: `
							inset 0 0 0 4px #F5BE3C, 
							inset 0 0 0 6px #000000,
							0 6px 0 0 #000000
						`,
					transition: "all 0.2s ease",
					boxSizing: "border-box",
				}}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onPrevious();
					}
				}}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="relative z-10">
					<polygon points="10,4 6,8 10,12" fill="#FFFFFF" />
				</svg>
				<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-[10px] pointer-events-none transition-opacity z-20"></div>
			</div>

			{/* Home Button */}
			<div
				onClick={onHome}
				className="group relative flex items-center justify-center w-12 h-12 cursor-pointer active:scale-95 transition-transform duration-100"
				style={{
					backgroundColor: "#2E8B57",
					backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #226640 2px, #226640 4px)`,
					border: "2px solid #000000",
					borderRadius: "12px",
					boxShadow: `
							inset 0 0 0 4px #F5BE3C, 
							inset 0 0 0 6px #000000,
							0 6px 0 0 #000000
						`,
					transition: "all 0.2s ease",
					boxSizing: "border-box",
				}}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onHome();
					}
				}}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="relative z-10">
					<path
						d="M8 2L3 7V13H7V10H9V13H13V7L8 2Z"
						fill="#FFFFFF"
						stroke="#000000"
						strokeWidth="0.5"
					/>
				</svg>
				<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-[10px] pointer-events-none transition-opacity z-20"></div>
			</div>

			{/* Next Button */}
			<div
				onClick={onNext}
				className="group relative flex items-center justify-center w-12 h-12 cursor-pointer active:scale-95 transition-transform duration-100"
				style={{
					backgroundColor: "#2E8B57",
					backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #226640 2px, #226640 4px)`,
					border: "2px solid #000000",
					borderRadius: "12px",
					boxShadow: `
							inset 0 0 0 4px #F5BE3C, 
							inset 0 0 0 6px #000000,
							0 6px 0 0 #000000
						`,
					transition: "all 0.2s ease",
					boxSizing: "border-box",
				}}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onNext();
					}
				}}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="relative z-10">
					<polygon points="6,4 10,8 6,12" fill="#FFFFFF" />
				</svg>
				<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-[10px] pointer-events-none transition-opacity z-20"></div>
			</div>
		</div>
	);
};

export default ImageNavigationControls;
