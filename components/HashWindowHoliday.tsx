"use client";

import { useEffect, useState } from "react";
import { PixelText } from "./holiday";
import { useProjectConfig } from "@/lib/useProjectConfig";

export default function HashWindowHoliday() {
	const { config } = useProjectConfig();
	const [displayText, setDisplayText] = useState("Coming Soon");
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (config) {
			setDisplayText(config.contract_address || "Coming Soon");
		}
	}, [config]);

	const handleCopy = async () => {
		if (!config?.contract_address) return;

		try {
			await navigator.clipboard.writeText(config.contract_address);

			// Show feedback
			setDisplayText("Copied!");
			setIsCopied(true);

			setTimeout(() => {
				setDisplayText(config.contract_address);
				setIsCopied(false);
			}, 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<div className="w-full h-full relative" style={{ zIndex: 50 }}>
			<div
				className="window frutiger-aero-window"
				style={{
					background: "rgba(255, 255, 255, 0.12)",
					backdropFilter: "blur(20px)",
					WebkitBackdropFilter: "blur(20px)",
					borderRadius: "12px",
					position: "relative",
					overflow: "hidden",
				}}>
				{/* Rain Decoration - Inside Top (Removed) */}

				{/* Rain Decoration - Inside Bottom (Removed) */}
				<div className="frutiger-aero-reflection" />
				<div
					className="window-body relative"
					style={{
						background: "transparent",
						padding: "2px 8px",
						border: "none",
					}}>
					<div className="terminal-container !border-none !bg-transparent">
						<div className="terminal-content !bg-black/60 rounded-[6px] backdrop-blur-sm">
							<div className="terminal-line flex items-center justify-center gap-3 flex-wrap py-1">
								<span
									className="terminal-text text-green-400"
									id="contract-display"
									style={{
										fontFamily:
											'"Courier New", Courier, "Lucida Console", Monaco, monospace',
										fontSize: "0.9rem",
										fontWeight: "bold",
										display: "inline-block",
										textAlign: "center",
									}}>
									{displayText}
								</span>
								{config?.contract_address && (
									<button
										className="copy-btn-revert"
										onClick={handleCopy}
										title="Copy Contract Address"
										style={{
											pointerEvents: "auto",
											minWidth: "auto",
											padding: "2px 8px",
										}}>
										{isCopied ? "✓" : "Copy"}
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
