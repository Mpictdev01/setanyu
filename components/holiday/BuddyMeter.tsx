"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import PixelText from "./PixelText";

interface BuddyMeterProps {
	value?: number; // 0-100, default akan dihitung otomatis
}

const BuddyMeter = ({ value }: BuddyMeterProps) => {
	// Nilai meter dari 0 (NAUGHTY) sampai 100 (NICE)
	const defaultValue = value ?? 75;
	const [meterValue, setMeterValue] = useState(0); // Mulai dari 0 untuk animasi
	const [isDragging, setIsDragging] = useState(false);
	const [isShaking, setIsShaking] = useState(false);
	const [isGlowing, setIsGlowing] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);
	const progressBarRef = useRef<HTMLDivElement>(null);
	const isDraggingRef = useRef(false);

	// Sudut untuk penunjuk (0 = NAUGHTY, 180 = NICE)
	// Gauge setengah lingkaran, jadi 0° = kiri, 180° = kanan
	const angle = (meterValue / 100) * 180; // 0-180 derajat

	// Animasi awal: dari 0 → 100 → default value
	useEffect(() => {
		if (hasAnimated) return; // Hanya animasi sekali saat mount

		const startTime = Date.now();
		const duration1 = 2000; // 2 detik untuk mencapai 100
		const pauseDuration = 200; // 200ms pause di 100
		const duration2 = 300; // 0.3 detik untuk kembali ke default

		let animationFrameId: number;
		let timeoutId: NodeJS.Timeout;

		const animate = () => {
			const elapsed = Date.now() - startTime;

			if (elapsed < duration1) {
				// Phase 1: 0 → 100
				const progress = elapsed / duration1;
				const newValue = Math.round(progress * 100);
				setMeterValue(newValue);
				animationFrameId = requestAnimationFrame(animate);
			} else if (elapsed < duration1 + pauseDuration) {
				// Phase 2: Pause di 100
				setMeterValue(100);
				if (!timeoutId) {
					timeoutId = setTimeout(() => {
						const finalStartTime = Date.now();
						const finalAnimate = () => {
							const finalElapsed = Date.now() - finalStartTime;
							if (finalElapsed < duration2) {
								// Phase 3: 100 → default
								const finalProgress = finalElapsed / duration2;
								const finalValue = Math.round(
									100 - (100 - defaultValue) * finalProgress
								);
								setMeterValue(finalValue);
								animationFrameId = requestAnimationFrame(finalAnimate);
							} else {
								// Selesai
								setMeterValue(defaultValue);
								setHasAnimated(true);
							}
						};
						animationFrameId = requestAnimationFrame(finalAnimate);
					}, pauseDuration);
				}
			}
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => {
			if (animationFrameId) cancelAnimationFrame(animationFrameId);
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [defaultValue, hasAnimated]);

	useEffect(() => {
		if (value !== undefined && hasAnimated) {
			setMeterValue(value);
		}
	}, [value, hasAnimated]);

	// Shake dan glow animation setiap 2 detik
	useEffect(() => {
		if (isDragging) return; // Jangan shake saat dragging

		const animationInterval = setInterval(() => {
			setIsShaking(true);
			setIsGlowing(true);
			setTimeout(() => {
				setIsShaking(false);
				setTimeout(() => {
					setIsGlowing(false);
				}, 500); // Glow lebih lama dari shake
			}, 200); // Durasi shake
		}, 2000); // Setiap 2 detik

		return () => clearInterval(animationInterval);
	}, [isDragging]);

	// Fungsi untuk menghitung nilai berdasarkan posisi mouse/touch
	const calculateValue = useCallback((clientX: number) => {
		if (!progressBarRef.current) return;

		const rect = progressBarRef.current.getBoundingClientRect();
		const x = clientX - rect.left;
		const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
		const newValue = Math.round(percentage);
		setMeterValue(newValue);
	}, []);

	// Handler untuk mouse/touch down
	const handleStart = useCallback(
		(clientX: number) => {
			isDraggingRef.current = true;
			setIsDragging(true);
			calculateValue(clientX);
		},
		[calculateValue]
	);

	// Handler untuk mouse/touch move
	const handleMove = useCallback(
		(clientX: number) => {
			if (isDraggingRef.current) {
				calculateValue(clientX);
			}
		},
		[calculateValue]
	);

	// Handler untuk mouse/touch up
	const handleEnd = useCallback(() => {
		isDraggingRef.current = false;
		setIsDragging(false);
	}, []);

	// Mouse event handlers
	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault();
			handleStart(e.clientX);
		},
		[handleStart]
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (isDraggingRef.current) {
				handleMove(e.clientX);
			}
		},
		[handleMove]
	);

	const handleMouseUp = useCallback(() => {
		handleEnd();
	}, [handleEnd]);

	// Touch event handlers
	const handleTouchStart = useCallback(
		(e: React.TouchEvent<HTMLDivElement>) => {
			if (e.touches.length > 0) {
				handleStart(e.touches[0].clientX);
			}
		},
		[handleStart]
	);

	const handleTouchMove = useCallback(
		(e: React.TouchEvent<HTMLDivElement>) => {
			if (isDraggingRef.current && e.touches.length > 0) {
				e.preventDefault();
				handleMove(e.touches[0].clientX);
			}
		},
		[handleMove]
	);

	const handleTouchEnd = useCallback(() => {
		handleEnd();
	}, [handleEnd]);

	// Global mouse move dan mouse up untuk drag di luar progress bar
	useEffect(() => {
		const handleGlobalMouseMove = (e: MouseEvent) => {
			if (isDraggingRef.current) {
				handleMove(e.clientX);
			}
		};

		const handleGlobalMouseUp = () => {
			if (isDraggingRef.current) {
				handleEnd();
			}
		};

		const handleGlobalTouchMove = (e: TouchEvent) => {
			if (isDraggingRef.current && e.touches.length > 0) {
				e.preventDefault();
				handleMove(e.touches[0].clientX);
			}
		};

		const handleGlobalTouchEnd = () => {
			if (isDraggingRef.current) {
				handleEnd();
			}
		};

		window.addEventListener("mousemove", handleGlobalMouseMove);
		window.addEventListener("mouseup", handleGlobalMouseUp);
		window.addEventListener("touchmove", handleGlobalTouchMove, {
			passive: false,
		});
		window.addEventListener("touchend", handleGlobalTouchEnd);

		return () => {
			window.removeEventListener("mousemove", handleGlobalMouseMove);
			window.removeEventListener("mouseup", handleGlobalMouseUp);
			window.removeEventListener("touchmove", handleGlobalTouchMove);
			window.removeEventListener("touchend", handleGlobalTouchEnd);
		};
	}, [handleMove, handleEnd]);

	return (
		<div className="flex flex-col gap-2 items-center w-full">
			{/* Gauge Meter */}
			<div
				className="relative w-full max-w-[200px] flex items-center justify-center mb-4"
				style={{ aspectRatio: "200 / 120" }}>
				{/* Meter Background Image */}
				<img
					src="/icon/spedo.png"
					alt="Meter"
					className="absolute object-contain"
					style={{
						width: "80%",
						height: "80%",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						imageRendering: "pixelated",
					}}
					draggable={false}
				/>

				{/* Labels */}
				<div className="absolute bottom-0 left-1">
					<span
						className="text-white font-black text-[10px] uppercase leading-tight"
						style={{
							fontFamily:
								'var(--font-press-start-2p), "Press Start 2P", monospace',
							WebkitTextStroke: "none",
							textShadow: "none",
						}}>
						SHALLOW
					</span>
				</div>
				<div className="absolute bottom-0 right-1">
					<span
						className="text-white font-black text-[10px] uppercase leading-tight"
						style={{
							fontFamily:
								'var(--font-press-start-2p), "Press Start 2P", monospace',
							WebkitTextStroke: "none",
							textShadow: "none",
						}}>
						DEEP
					</span>
				</div>

				{/* Needle - Simple CSS Needle */}
				<div
					className="absolute origin-bottom pointer-events-none"
					style={{
						left: "50%",
						bottom: "15px",
						transform: `translateX(-50%) rotate(${angle - 90}deg)`,
						transformOrigin: "bottom center",
						width: "4px",
						height: "70px",
						backgroundColor: "#FF4500",
						border: "1px solid #000",
						borderRadius: "4px 4px 0 0",
						zIndex: 10,
						boxShadow: "0 0 5px rgba(255, 69, 0, 0.5)",
					}}
				/>
			</div>

			{/* Progress Bar */}
			<div className="w-full flex flex-col gap-1 relative">
				<div
					ref={progressBarRef}
					className="relative w-full h-4 bg-gray-800 overflow-hidden cursor-pointer select-none"
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					style={{
						userSelect: "none",
						WebkitUserSelect: "none",
						border: "2px solid #000000",
						borderRadius: "8px",
						boxShadow: isGlowing
							? "inset 0 0 0 1px #FFFFFF, inset 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -1px 2px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4), 0 0 40px rgba(255, 255, 255, 0.2)"
							: "inset 0 0 0 1px #FFFFFF, inset 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -1px 2px rgba(255, 255, 255, 0.3)",
						animation: isShaking ? "shake3d 0.2s ease-in-out" : "none",
						transition: isGlowing
							? "box-shadow 0.5s ease-in-out"
							: "box-shadow 0.3s ease-in-out",
					}}>
					{/* Progress Fill dengan pola garis merah-putih */}
					<div
						className="absolute left-0 top-0 h-full"
						style={{
							width: `${meterValue}%`,
							padding: "2px",
							boxSizing: "border-box",
						}}>
						<div
							style={{
								width: "100%",
								height: "100%",
								background:
									"repeating-linear-gradient(90deg, #008080 0%, #008080 25%, #FF7F50 25%, #FF7F50 50%)",
								backgroundSize: "26px 100%",
								borderRight: "1px solid #000",
								pointerEvents: "none",
								transform: "skewX(-30deg)",
								transformOrigin: "left center",
								borderRadius: "6px 0 0 6px",
								transition: hasAnimated
									? "width 0.1s ease-out"
									: "width 0.02s linear",
							}}
						/>
					</div>
					{/* Drag indicator (optional visual feedback) */}
					{isDragging && (
						<div
							className="absolute top-0 h-full w-1 bg-yellow-300 pointer-events-none z-10"
							style={{
								left: `${meterValue}%`,
								transform: "translateX(-50%)",
								boxShadow: "0 0 4px rgba(255, 255, 0, 0.8)",
							}}
						/>
					)}
				</div>
				<div className="text-center">
					<span
						className="text-white font-black text-xs uppercase"
						style={{
							fontFamily:
								'var(--font-press-start-2p), "Press Start 2P", monospace',
							WebkitTextStroke: "none",
							textShadow: "none",
							display: "inline-block",
						}}>
						$BUDDY
					</span>
				</div>
			</div>
		</div>
	);
};

export default BuddyMeter;
