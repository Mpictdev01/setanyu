"use client";

import Slideshow from "./Slideshow";
import ImageViewer from "./holiday/ImageViewer";
import { HolidaySidePanel } from "./holiday";

import Link from "next/link";

export default function SidePanelRightHoliday() {
	return (
		<div className="flex flex-col gap-3 h-full">
			{/* Meme Images Slideshow Window */}
			<HolidaySidePanel title="BENJAMIN MEMES" className="sm:w-[250px] w-full">
				<div className="flex flex-col w-full">
					<div
						style={{ height: "200px" }}
						className="w-full overflow-hidden flex items-center justify-center">
						<Slideshow />
					</div>
				</div>
			</HolidaySidePanel>

			{/* How To Buy Window - Refined Layout */}
			<HolidaySidePanel
				title="HOW TO BUY"
				className="sm:w-[250px] w-full flex-1">
				<div className="w-full h-full overflow-hidden flex flex-col p-4 gap-6 text-[11px] text-white/90 font-sans leading-tight justify-center">
					<div className="flex flex-col items-center text-center gap-2">
						<img
							src="/favico/favicon-32x32.png"
							alt="Wallet"
							className="w-8 h-8 object-contain mb-1 drop-shadow-[0_0_8px_rgba(245,190,60,0.5)]"
						/>
						<strong className="text-red-500 tracking-wide">
							1) Get a Wallet
						</strong>
						<p className="opacity-80">Download Phantom. Fund with SOL.</p>
					</div>

					<div className="flex flex-col items-center text-center gap-1">
						<strong className="text-red-500 tracking-wide">
							2) Connect to DEX
						</strong>
						<p className="opacity-80">Go to Raydium. Connect wallet.</p>
					</div>

					<div className="flex flex-col items-center text-center gap-1">
						<strong className="text-red-500 tracking-wide">
							3) Swap for $BENJAMIN
						</strong>
						<p className="opacity-80">Paste CA. Confirm swap.</p>
					</div>

					<div className="flex flex-col items-center text-center gap-1">
						<strong className="text-red-500 tracking-wide">
							4) Ride with Benjamin
						</strong>
						<p className="opacity-80">Enjoy the ride.</p>
					</div>
				</div>
			</HolidaySidePanel>
		</div>
	);
}
