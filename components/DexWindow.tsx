"use client";

import { useEffect, useState } from "react";

export default function DexWindow() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// This will be managed by dex-chart.js
		const checkManager = setInterval(() => {
			if (window.dexChartManager) {
				// Manager is ready
				clearInterval(checkManager);
			}
		}, 100);

		return () => clearInterval(checkManager);
	}, []);

	const handleClose = () => {
		if (window.dexChartManager) {
			window.dexChartManager.close();
		}
	};

	const handleBuy = () => {
		if (window.dexChartManager) {
			window.dexChartManager.openBuyLink();
		}
	};

	const handleDex = () => {
		if (window.dexChartManager) {
			window.dexChartManager.openDexLink();
		}
	};

	return (
		<div
			id="dex-window"
			className="window dex-window"
			style={{ display: "none" }}>
			<div className="title-bar flex items-center justify-between">
				<div
					className="title-bar-text text-center w-full"
					style={{
						fontSize: "0.75rem",
						WebkitTextStroke: "none",
						textShadow: "none",
					}}>
					BENJAMIN NETANYAZU Chart
				</div>
				{/* Container Tombol */}
				<div className="flex gap-1 ml-auto items-center">
					{/* 1. Tombol Minimize (_) */}
					<button
						aria-label="Minimize"
						className="bg-[#F5BE3C] border-2 border-black rounded shadow-[1px_1px_0_0_#000] hover:mt-[1px] hover:shadow-none flex items-center justify-center transition-all"
						style={{
							width: "20px",
							height: "20px",
							minWidth: "20px",
							maxWidth: "20px",
							minHeight: "20px",
							maxHeight: "20px",
							aspectRatio: "1 / 1",
							boxSizing: "border-box",
						}}>
						<span className="text-black font-bold text-[10px] leading-none">
							_
						</span>
					</button>
					{/* 2. Tombol Maximize (Kotak) */}
					<button
						aria-label="Maximize"
						className="bg-[#F5BE3C] border-2 border-black rounded shadow-[1px_1px_0_0_#000] hover:mt-[1px] hover:shadow-none flex items-center justify-center transition-all"
						style={{
							width: "20px",
							height: "20px",
							minWidth: "20px",
							maxWidth: "20px",
							minHeight: "20px",
							maxHeight: "20px",
							aspectRatio: "1 / 1",
							boxSizing: "border-box",
						}}>
						<div className="w-2 h-2 border-2 border-black"></div>
					</button>
					{/* 3. Tombol Close (X Merah) */}
					<button
						aria-label="Close"
						onClick={handleClose}
						className="bg-[#FF4500] border-2 border-black rounded shadow-[1px_1px_0_0_#000] hover:mt-[1px] hover:shadow-none flex items-center justify-center transition-all"
						style={{
							width: "20px",
							height: "20px",
							minWidth: "20px",
							maxWidth: "20px",
							minHeight: "20px",
							maxHeight: "20px",
							aspectRatio: "1 / 1",
							boxSizing: "border-box",
						}}>
						<span className="text-white font-bold text-[8px] leading-none">
							X
						</span>
					</button>
				</div>
			</div>
			<div className="window-body-chart">
				<div className="chart-container">
					<div id="chart-embed" className="chart-embed">
						{/* Chart will be embedded here */}
					</div>
				</div>
				<div className="chart-footer">
					<button className="chart-btn buy-btn" onClick={handleBuy}>
						<div className="chart-btn-top">BUY BUDDY</div>
						<div className="chart-btn-bottom"></div>
						<div className="chart-btn-base"></div>
					</button>
					<button className="chart-btn dex-btn" onClick={handleDex}>
						<div className="chart-btn-top">OPEN DEX</div>
						<div className="chart-btn-bottom"></div>
						<div className="chart-btn-base"></div>
					</button>
				</div>
			</div>
		</div>
	);
}
