"use client";

import { useState, useEffect } from "react";
import { HolidaySidePanel } from "./holiday";
import StatsWindow from "./StatsWindow";

export default function SidePanelHoliday() {
	const [isPlaying, setIsPlaying] = useState(true);

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="flex flex-col gap-3 h-full">
			{/* Stats Window */}
			<StatsWindow />

			{/* Lore Window */}
			<HolidaySidePanel title="THE LORE" className="sm:w-[250px] w-full">
				<div className="w-full h-auto text-[10px] text-white/90 p-3 leading-relaxed font-sans text-center">
					<p>
						Born from a Matrix glitch, Benjamin Netanyazu embodies the chaotic energy of the
						bull run. Hold Benjamin Netanyazu to ride the eternal green waves.
					</p>
				</div>
			</HolidaySidePanel>

			{/* Video Window */}
			<HolidaySidePanel title="BENJAMIN NETANYAZU CAM" className="sm:w-[250px] w-full flex-1 min-h-0 flex flex-col">
				<RandomImageCam
					isPlaying={isPlaying}
					onTogglePlay={togglePlay}
				/>
			</HolidaySidePanel>
		</div>
	);
}

function RandomImageCam({
	isPlaying,
	onTogglePlay,
}: {
	isPlaying: boolean;
	onTogglePlay: () => void;
}) {
	const images = [
		"/spech/images_1.avif",
		"/spech/images_2.avif",
		"/spech/images_3.avif",
		"/spech/images_4.avif",
	];
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (!isPlaying) return;
		const interval = setInterval(() => {
			setCurrentIndex((prev) => {
				let next;
				// Ensure next image is different from the previous one for a dynamic random effect
				do {
					next = Math.floor(Math.random() * images.length);
				} while (next === prev);
				return next;
			});
		}, 150); // 150ms interval for random animation
		
		return () => clearInterval(interval);
	}, [isPlaying, images.length]);

	return (
		<div 
			className="w-full h-full flex-1 bg-black/40 rounded-lg overflow-hidden relative group cursor-pointer" 
			onClick={onTogglePlay}
		>
			<img
				src={images[currentIndex]}
				className="absolute inset-0 w-full h-full block object-cover object-top"
				alt="Benjamin Netanyazu Cam"
				draggable={false}
			/>
			<div className="absolute top-2 right-2 text-[10px] text-red-500 font-bold animate-pulse pointer-events-none">
				● LIVE
			</div>

			{/* Play/Pause Overlay on Hover */}
			<div
				className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200 pointer-events-none ${
					isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
				}`}>
				<span className="text-white/80 text-2xl font-bold drop-shadow-md">
					{isPlaying ? "❚❚" : "▶"}
				</span>
			</div>
		</div>
	);
}
