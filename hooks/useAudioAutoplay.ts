"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook untuk mengatasi autoplay policy dengan sistem interaksi user
 * Menunggu interaksi user REAL pertama kali, lalu memutar audio secara otomatis
 * Terintegrasi dengan global bot dari main.js
 */
export function useAudioAutoplay(audioRef: React.RefObject<HTMLAudioElement | null>) {
	const [canPlay, setCanPlay] = useState(false);
	const hasInteracted = useRef(false);
	const audioPlayed = useRef(false);

	useEffect(() => {
		if (!audioRef.current) return;

		// Setup audio properties
		if (audioRef.current) {
			audioRef.current.volume = audioRef.current.volume || 0.5;
			audioRef.current.loop = true;
		}

		// Fungsi untuk memutar audio
		const playAudio = async () => {
			if (audioRef.current && !audioPlayed.current && hasInteracted.current) {
				try {
					await audioRef.current.play();
					setCanPlay(true);
					audioPlayed.current = true;
					console.log("✅ Background audio started");
				} catch (error) {
					console.log("Audio play error:", error);
				}
			}
		};

		// Handler untuk user interaction REAL
		const handleUserInteraction = async () => {
			if (!hasInteracted.current) {
				hasInteracted.current = true;
				await playAudio();
			}
		};

		// Handler untuk custom event dari global bot (main.js)
		const handleBotEvent = async () => {
			await handleUserInteraction();
		};

		// Event listeners untuk berbagai jenis interaksi user REAL
		const interactionEvents = [
			"click",
			"touchstart",
			"touchend",
			"mousedown",
			"keydown",
			"scroll",
			"pointerdown",
			"wheel",
			"mousemove",
		];

		// Tambahkan listeners
		interactionEvents.forEach((eventType) => {
			window.addEventListener(eventType, handleUserInteraction, {
				once: true,
				passive: true,
			});
		});

		// Listen untuk custom event dari global bot
		document.addEventListener("audio-interaction-ready", handleBotEvent, {
			once: true,
		});

		// Coba play audio langsung (akan gagal di sebagian besar browser tanpa interaksi)
		const initialPlay = () => {
			if (audioRef.current && !audioPlayed.current) {
				audioRef.current
					.play()
					.then(() => {
						setCanPlay(true);
						audioPlayed.current = true;
						console.log("✅ Background audio started automatically");
					})
					.catch(() => {
						// Silent fail - interaction needed
					});
			}
		};

		initialPlay();

		// Cleanup
		return () => {
			interactionEvents.forEach((eventType) => {
				window.removeEventListener(eventType, handleUserInteraction);
			});
			document.removeEventListener("audio-interaction-ready", handleBotEvent);
		};
	}, [audioRef]);

	return canPlay;
}