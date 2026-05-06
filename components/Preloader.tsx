"use client";

import { useEffect, useMemo, useState } from "react";
import ToyBuyButton from "./holiday/ToyBuyButton";
import HolidayWindow from "./holiday/HolidayWindow";

// All money birds burst from bottom-right corner and scatter in all directions
const SCATTER_DIRS = [
	{ ex: `-150px`,  ey: `-150px`  }, // top-left
	{ ex: `50vw`,    ey: `-150px`  }, // top-center
	{ ex: `110vw`,   ey: `-150px`  }, // top-right
	{ ex: `-150px`,  ey: `50vh`    }, // mid-left
	{ ex: `-150px`,  ey: `110vh`   }, // bottom-left
	{ ex: `50vw`,    ey: `110vh`   }, // bottom-center
	{ ex: `20vw`,    ey: `-150px`  }, // top (slightly left)
	{ ex: `110vw`,   ey: `30vh`    }, // right-upper
	{ ex: `110vw`,   ey: `80vh`    }, // right-lower
	{ ex: `80vw`,    ey: `-150px`  }, // top-right side
	{ ex: `10vw`,    ey: `110vh`   }, // bottom-left side
	{ ex: `-150px`,  ey: `20vh`    }, // left-upper
	{ ex: `40vw`,    ey: `-150px`  }, // top-center-left
	{ ex: `110vw`,   ey: `110vh`   }, // bottom-right (out)
];

const MONEY_BIRDS = SCATTER_DIRS.map((dir, i) => ({
	id: i,
	startX: `${95 + (i % 3)}vw`,
	startY: `${95 + (i % 3)}vh`,
	midX: `${20 + (i * 137) % 60}vw`,  // Random mid-point
	midY: `${20 + (i * 157) % 60}vh`,
	endX: dir.ex,
	endY: dir.ey,
	delay: i * 40,                   // Faster spawn stagger
	duration: 2200 + (i * 150) % 1000, // Much slower: 2.2s - 3.2s
	size: 65 + (i * 15) % 50,
}));

export default function Preloader() {
	const [isVisible, setIsVisible] = useState(true);
	const [mainContentVisible, setMainContentVisible] = useState(false);
	const [hasStarted, setHasStarted] = useState(false);
	const [showExplosion, setShowExplosion] = useState(false);
	const [showMoneyBirds, setShowMoneyBirds] = useState(false);

	useEffect(() => {
		// Remove FOUC curtain once Preloader mounts
		const curtain = document.getElementById("fouc-curtain");
		if (curtain) {
			curtain.style.opacity = "0";
			setTimeout(() => {
				curtain.style.display = "none";
			}, 500);
		}

		const mainContent = document.getElementById("main-content");
		if (!mainContent) return;
		if (!hasStarted) return;

		mainContent.classList.remove("hidden");

		// Timeline after ENTER click:
		// 0ms     → flayy.avif starts flying diagonal
		// 1800ms  → flayy reaches corner → explosion + money birds appear
		// 2300ms  → explosion gone → potion appears
		// 2900ms  → potion gone
		// 3200ms  → preloader fades out

		const t1 = setTimeout(() => {
			setShowExplosion(true);
			setShowMoneyBirds(true);
			document.body.classList.add("explosion-started");
		}, 1800);

		const t2 = setTimeout(() => {
			setShowExplosion(false);
		}, 2400);

		const t3 = setTimeout(() => {
			setIsVisible(false);
			setTimeout(() => {
				setMainContentVisible(true);
				document.body.classList.add("preloader-complete");
			}, 800);
		}, 4500); // Wait longer (1.8s + ~2.7s duration) for birds to fly out

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
			document.body.classList.remove("explosion-started");
			document.body.classList.remove("preloader-complete");
		};
	}, [hasStarted]);

	const handleStart = () => {
		setHasStarted(true);
	};

	if (!isVisible && mainContentVisible) return null;

	return (
		<div
			id="preloader"
			className="fixed inset-0 z-[100] flex items-center justify-center"
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: 100,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "black",
				backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bg.avif')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				opacity: isVisible ? 1 : 0,
				transition: "opacity 0.8s ease-out",
				pointerEvents: isVisible ? "auto" : "none",
			}}>

			{/* Diagonal Falling Image */}
			{hasStarted && (
				<img
					src="/flayy.avif"
					alt="flying"
					className="animate-diagonal-fall"
				/>
			)}

			{/* Explosion at Bottom-Right */}
			{showExplosion && (
				<img
					src="/explosion-gif-transparent.gif"
					alt="explosion"
					className="animate-explosion-appear"
				/>
			)}



			{/* Money Birds – many of them flying wild */}
			{showMoneyBirds &&
				MONEY_BIRDS.map((bird) => (
					<img
						key={bird.id}
						src="/money.gif"
						alt="money bird"
						style={{
							position: "fixed",
							zIndex: 999998,
							pointerEvents: "none",
							width: `${bird.size}px`,
							height: "auto",
							top: bird.startY,
							left: bird.startX,
							animation: `money-bird-fly-${bird.id} ${bird.duration}ms ${bird.delay}ms ease-in forwards`,
						}}
					/>
				))}

			{/* Inject per-bird keyframes */}
			{showMoneyBirds && (
				<style>{MONEY_BIRDS.map((b) => `
@keyframes money-bird-fly-${b.id} {
  0%   { transform: translate(0,0) scale(0.5); opacity:1; }
  25%  { transform: translate(calc(${b.midX} - ${b.startX}), calc(${b.midY} - ${b.startY})) scale(1.2); }
  50%  { transform: translate(calc(50vw - ${b.startX}), calc(10vh - ${b.startY})) scale(1); }
  100% { transform: translate(calc(${b.endX} - ${b.startX}), calc(${b.endY} - ${b.startY})) scale(0.8); opacity:1; }
}`).join("\n")}</style>
			)}

			{/* Overlay */}
			<div className="absolute inset-0 z-10 bg-transparent" />

			{/* Entry Window */}
			<div className="relative z-20 w-full max-w-md px-4 -mt-24">
				<HolidayWindow
					title=""
					hideControls
					bodyPadding="30px"
					centerTitle={true}
					hideTitleBar={true}>
					<div className="flex flex-col items-center gap-8 py-4 px-8 min-w-[320px]">
						<div className="flex items-center justify-center gap-4">
							<img src="/flag.jpg" alt="Israel Flag" className="w-12 h-8 md:w-16 md:h-10 object-cover rounded shadow-lg border-2 border-white/50" draggable={false} />
							<h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] text-center">
								BENJAMIN
							</h1>
							<img src="/flag.jpg" alt="Israel Flag" className="w-12 h-8 md:w-16 md:h-10 object-cover rounded shadow-lg border-2 border-white/50" draggable={false} />
						</div>
						<div className="w-64">
							<ToyBuyButton label="ENTER" onClick={handleStart} fullWidth />
						</div>
					</div>
				</HolidayWindow>
			</div>
		</div>
	);
}
