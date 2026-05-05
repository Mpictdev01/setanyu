"use client";

import MainWindowHoliday from "../components/MainWindowHoliday";
import SidePanelHoliday from "../components/SidePanelHoliday";
import SidePanelRightHoliday from "../components/SidePanelRightHoliday";
import HashWindowHoliday from "../components/HashWindowHoliday";
import DexWindow from "../components/DexWindow";
import Preloader from "../components/Preloader";
import LoveMarquee from "../components/LoveMarquee";
import FloatingActions from "../components/FloatingActions";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		// Main.js will be loaded via Script tag in layout
	}, []);

	return (
		<>
			<Preloader />
			<img
				src="/bg.jpeg"
				alt="Background"
				className="fixed inset-0 w-full h-full object-cover z-[-1] pointer-events-none"
				draggable={false}
			/>

			<div
				id="main-content"
				className="w-full h-screen flex flex-col gap-2 items-center pt-2 pb-4 px-4 mx-auto relative hidden overflow-hidden">
				<div className="drop-in-element drop-in-delay-1.5 w-full flex justify-center mt-6">
					<LoveMarquee />
				</div>

				{/* Main Content Section */}
				<div className="main-content-section flex-1 flex sm:flex-row flex-col gap-3 w-full max-w-[80vw] mx-auto items-stretch min-h-0">
					<div className="drop-in-element drop-in-delay-2 flex-shrink-0">
						<SidePanelHoliday />
					</div>
					<div className="drop-in-element drop-in-delay-3 flex-1 min-w-0 h-full">
						<MainWindowHoliday />
					</div>
					<div className="drop-in-element drop-in-delay-4 flex-shrink-0">
						<SidePanelRightHoliday />
					</div>
				</div>

				{/* Bottom Section */}
				<div className="drop-in-element drop-in-delay-5 bottom-section w-full max-w-[80vw] mx-auto flex-shrink-0">
					<HashWindowHoliday />
				</div>

				<DexWindow />
			</div>

			{/* Potion Decoration */}
			<img
				src="/potion.gif"
				alt="Potion"
				className="potion-decoration fixed bottom-0 right-0 z-40 w-32 md:w-48 pointer-events-none"
				style={{ transform: "translate(20%, 20%)" }}
				draggable={false}
			/>

			{/* Explosion Decorations (Background) */}
			<img
				src="/explosion-gif-transparent.gif"
				alt="Explosion 1"
				className="fixed top-[10%] left-[5%] z-0 w-40 md:w-56 pointer-events-none mix-blend-screen opacity-70"
				draggable={false}
			/>
			<img
				src="/explosion-gif-transparent.gif"
				alt="Explosion 2"
				className="fixed bottom-[20%] right-[10%] z-0 w-32 md:w-48 pointer-events-none mix-blend-screen opacity-60"
				draggable={false}
				style={{ transform: "rotate(45deg)" }}
			/>
			<img
				src="/explosion-gif-transparent.gif"
				alt="Explosion 3"
				className="fixed top-[30%] right-[5%] z-0 w-48 md:w-64 pointer-events-none mix-blend-screen opacity-75"
				draggable={false}
				style={{ transform: "rotate(-15deg)" }}
			/>
			<img
				src="/explosion-gif-transparent.gif"
				alt="Explosion 4"
				className="fixed bottom-[10%] left-[15%] z-0 w-36 md:w-52 pointer-events-none mix-blend-screen opacity-65"
				draggable={false}
				style={{ transform: "rotate(20deg)" }}
			/>

			{/* <FloatingActions /> */}
		</>
	);
}
