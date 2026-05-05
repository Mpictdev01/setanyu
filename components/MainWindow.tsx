"use client";

import SocialButtons from "./SocialButtons";
import BuyButton from "./BuyButton";

export default function MainWindow() {
	// Main.js is loaded via Script tag in layout.tsx
	// No need to load it again here
	// MainWindow dan isinya muncul bersamaan (tidak ada delay terpisah)

	return (
		<div className="main-window window w-full h-full p-2">
			<div className="window-content">
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
				<div className="window-body h-full">
					<video className="bg-video p-2" autoPlay muted loop>
						<source src="/img/preloader/bg.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>

					<div className="bg-container">
						<div className="content-overlay">
							<div className="text-content">
								<h2 className="main-title">$BUDDY</h2>

								<SocialButtons />

								<BuyButton />
							</div>
						</div>
					</div>

					<div className="character-section-bottom">
						<img src="/img/herio.png" className="character-image" alt="herio" />
					</div>
				</div>
			</div>
		</div>
	);
}
