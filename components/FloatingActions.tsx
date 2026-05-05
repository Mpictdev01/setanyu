"use client";

import React, { useState, useEffect, useRef } from "react";
import { HolidayWindow, ToyBuyButton } from "./holiday";
import { useProjectConfig } from "@/lib/useProjectConfig";

const FloatingActions = () => {
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
		<div className="fixed bottom-4 left-4 z-[100] pointer-events-none">
			<div>
				<div
					className="floating-actions-entrance pointer-events-auto"
					style={{
						width: "280px",
					}}>
					<HolidayWindow
						title="$BENJAMIN NETANYAZU SOCIALS"
						hideControls={true}
						bodyPadding="6px">
						<div className="flex flex-wrap justify-center gap-2">
							<>
								<button
									onClick={() => {
										if (config?.twitter_url) {
											window.open(config.twitter_url, "_blank", "noopener,noreferrer");
										}
									}}
									className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm group"
									aria-label="Twitter">
									<i className="fab fa-twitter text-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"></i>
								</button>
								<button
									onClick={() => {
										if (config?.telegram_url) {
											window.open(config.telegram_url, "_blank", "noopener,noreferrer");
										}
									}}
									className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm group"
									aria-label="Telegram">
									<i className="fab fa-telegram text-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"></i>
								</button>
								<button
									onClick={() => {
										if (config?.community_url) {
											window.open(config.community_url, "_blank", "noopener,noreferrer");
										}
									}}
									className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm group"
									aria-label="Community">
									<i className="fas fa-users text-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"></i>
								</button>
								<button
									onClick={handleChartClick}
									className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm group"
									aria-label="DexScreener">
									<i className="fas fa-chart-line text-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"></i>
								</button>
								<button
									onClick={handleBuyClick}
									className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm group"
									aria-label="Buy">
									<i className="fas fa-rocket text-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"></i>
								</button>
							</>
						</div>
					</HolidayWindow>
				</div>
			</div>
		</div>
	);
};

export default FloatingActions;
