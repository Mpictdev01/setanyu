"use client";

import { useEffect, useState } from "react";

export default function HashWindow() {
	const [contractText, setContractText] = useState("Coming Soon");
	const [showCopyButton, setShowCopyButton] = useState(false);

	useEffect(() => {
		const checkConfig = setInterval(() => {
			if (window.BUDDY_CONFIG) {
				setContractText(window.BUDDY_CONFIG.getContractDisplayText());
				setShowCopyButton(window.BUDDY_CONFIG.hasContractAddress());
				clearInterval(checkConfig);
			}
		}, 100);

		return () => clearInterval(checkConfig);
	}, []);

	const handleCopy = () => {
		if (window.copyCA) {
			window.copyCA();
		}
	};

	return (
		<div className="hash-window window w-full relative" style={{ zIndex: 30 }}>
			<div className="title-bar flex items-center justify-between">
				<div
					className="title-bar-text"
					style={{
						fontSize: "0.75rem",
						WebkitTextStroke: "none",
						textShadow: "none",
					}}>
					BUDDY
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
			<div className="window-body">
				<div className="terminal-container">
					<div className="terminal-content">
						<div className="terminal-line">
							<span className="terminal-prompt">🥛</span>
							<span className="terminal-text" id="contract-display">
								{contractText}
							</span>
							{showCopyButton && (
								<div
									className="copy-button-wrapper"
									id="copy-button-wrapper"
									style={{ display: "inline-block" }}>
									<button
										className="copy-btn"
										onClick={handleCopy}
										title="Copy Contract Address">
										<i className="fas fa-copy"></i> Copy CA
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
