"use client";

import { useEffect, useState } from "react";
import { HolidayWindow } from "./holiday";
import { PixelText } from "./holiday";
import { ToyBuyButton } from "./holiday";
import { useProjectConfig } from "@/lib/useProjectConfig";
import SocialLinks from "./SocialLinks";

import { useRouter } from "next/navigation";

export default function MainWindowHoliday() {
	const router = useRouter();
	const { config } = useProjectConfig();

	const handleBuyClick = () => {
		if (!config || !config.buy_platform) return;
		let baseUrl = '';
		if (config.buy_platform === 'pumpfun') {
			baseUrl = 'https://pump.fun/coin/';
		} else if (config.buy_platform === 'jup') {
			baseUrl = 'https://jup.ag/swap/SOL-';
		}
		if (config.contract_address && baseUrl) {
			window.open(`${baseUrl}${config.contract_address}`, "_blank", "noopener,noreferrer");
		}
	};

	const handleChartClick = () => {
		if (config?.dexscreener_url) {
			window.open(config.dexscreener_url, "_blank", "noopener,noreferrer");
		}
	};

	return (
		<div className="w-full h-full relative flex flex-col">
			<HolidayWindow
				icon="/head.png"
				title="WELCOME TO MY TOWN"
				className="w-full h-full"
				onClose={() => {}}
				hideControls={true}
				bodyPadding="6px"
				hideCRT={false}
				centerTitle={true}>
				<div className="relative w-full h-full flex flex-col items-center bg-black/40 rounded-xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border border-white/10">
					{/* Television Screen Background */}
					<img
						src="/bg.avif"
						className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
						alt="TV Screen"
						draggable={false}
					/>

					{/* CRT Noise Effect */}
					<div className="frutiger-aero-noise opacity-30" />

					{/* Content Overlay */}
					<div className="relative z-10 flex flex-col items-center gap-4 flex-1 w-full mt-[10vh]">
						{/* Title */}
						<h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] text-center whitespace-nowrap">
							BENJAMIN NETANYAZU
						</h1>
						{/* API GIF - 140% width, centered and sunk 5% into window bottom, masked */}
						<div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-0 pointer-events-none w-[140%]">
							<img
								src="/api.gif"
								className="w-full h-auto opacity-100 max-w-none"
								alt="api"
								style={{ transform: "translateY(5%)" }}
								draggable={false}
							/>
						</div>

						{/* Character Image - 2x larger and peeking from bottom-right corner, masked by window */}
						<div className="absolute bottom-[-20px] right-[-20px] z-10 pointer-events-none">
							<img
								src="/grump.avif"
								className="w-[600px] h-auto opacity-100"
								alt="benjamin netanyazu"
								style={{ transform: "translate(30%, 20%)" }}
								draggable={false}
							/>
						</div>
						{/* Social Buttons - Bottom Left inside Window */}
						<div className="absolute bottom-8 left-8 z-20">
							<SocialLinks />
						</div>
					</div>
				</div>
			</HolidayWindow>
		</div>
	);
}
