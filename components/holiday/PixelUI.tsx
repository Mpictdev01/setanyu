"use client";

import React from "react";
import HolidayWindow from "./HolidayWindow";
import HolidaySidePanel from "./HolidaySidePanel";
import ToyBuyButton from "./ToyBuyButton";
import ContentPlaceholder from "./ContentPlaceholder";
import InstructionBadge from "./InstructionBadge";

// --- HALAMAN UTAMA (SHOWCASE) ---
const PixelUI = () => {
	return (
		<div className="min-h-screen bg-slate-900 p-8 font-sans overflow-y-auto">
			<div className="max-w-7xl mx-auto">
				{/* JUDUL TEMA */}
				<h2 className="text-white mb-12 text-3xl opacity-90 font-mono text-center border-b-2 border-white/10 pb-6 tracking-[0.2em] text-yellow-400 drop-shadow-md">
					🎄 TEMA NATAL UI KIT 🎄
				</h2>

				{/* SECTION 1: REFERENSI (DILARANG PAKAI) */}
				<div className="mb-16 bg-red-900/20 p-6 rounded-xl border border-red-500/30">
					<h3 className="text-slate-400 text-xs mb-4 font-mono uppercase tracking-widest pl-3">
						01. Legacy Reference
					</h3>
					<InstructionBadge
						text="DILARANG: JANGAN TERAPKAN KOMPONEN INI"
						type="warning"
					/>

					<div className="flex flex-wrap gap-8 items-start justify-center lg:justify-start opacity-50 grayscale hover:grayscale-0 transition-all mt-4">
						<div className="pointer-events-none">
							<div className="relative inline-block">
								<div
									className="relative inline-block"
									style={{
										backgroundColor: "#2E8B57",
										backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #226640 2px, #226640 4px)`,
										border: "2px solid #000000",
										borderRadius: "12px",
										boxShadow: `inset 0 0 0 4px #F5BE3C, inset 0 0 0 6px #000000`,
									}}>
									<div className="relative z-10 w-full h-full flex items-center gap-4 px-8 py-3">
										<span
											className="text-2xl font-black text-white tracking-wider uppercase"
											style={{
												fontFamily: '"Verdana", sans-serif',
												WebkitTextStroke: "1.5px black",
												textShadow: "3px 3px 0 #000",
											}}>
											Legacy Header
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* SECTION 2: HOLIDAY WINDOWS (MAIN) */}
				<div className="mb-16 border-t border-white/10 pt-8">
					<h3 className="text-slate-400 text-xs mb-4 font-mono uppercase tracking-widest pl-3">
						02. Main Window Component
					</h3>

					{/* INSTRUKSI JELAS */}
					<InstructionBadge text="TERAPKAN DI: MAIN WINDOW" type="success" />

					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
						<HolidayWindow title="MAIN_APP.EXE" className="w-full">
							<ContentPlaceholder label="KONTEN UTAMA DISINI" />
						</HolidayWindow>
						<HolidayWindow title="GAME_SCREEN.EXE" className="w-full">
							<ContentPlaceholder label="AREA GAMEPLAY DISINI" />
						</HolidayWindow>
					</div>
				</div>

				{/* SECTION 3: HOLIDAY SIDE PANEL (SIDE) */}
				<div className="mb-16 border-t border-white/10 pt-8">
					<h3 className="text-slate-400 text-xs mb-4 font-mono uppercase tracking-widest pl-3">
						03. Side Panel Component
					</h3>

					{/* INSTRUKSI JELAS */}
					<InstructionBadge
						text="TERAPKAN DI: SIDE WINDOW / SIDE PANEL"
						type="info"
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
						<HolidaySidePanel title="INVENTORY" className="w-full">
							<ContentPlaceholder label="LIST ITEM" />
						</HolidaySidePanel>
						<HolidaySidePanel title="STATUS" className="w-full">
							<ContentPlaceholder label="STATS PEMAIN" />
						</HolidaySidePanel>
					</div>
				</div>

				{/* SECTION 4: TOY BUY BUTTON (BUTTONS) */}
				<div className="border-t border-white/10 pt-8">
					<h3 className="text-slate-400 text-xs mb-4 font-mono uppercase tracking-widest pl-3">
						04. Action Buttons
					</h3>

					{/* INSTRUKSI JELAS */}
					<InstructionBadge text="TERAPKAN DI: SETIAP TOMBOL" type="success" />

					<div className="flex flex-wrap gap-8 mt-6">
						<ToyBuyButton label="START GAME" />
						<ToyBuyButton label="OPEN GIFT" />
						<ToyBuyButton label="NEXT LEVEL" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PixelUI;
