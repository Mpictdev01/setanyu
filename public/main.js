if (
	document.readyState === "complete" ||
	document.readyState === "interactive"
) {
	initAudioAutoplayBot();
} else {
	document.addEventListener("DOMContentLoaded", initAudioAutoplayBot);
}

function initAudioAutoplayBot() {
	let hasInteracted = false;
	let audioElements = [];

	const findAudioElements = () => {
		const audios = document.querySelectorAll(
			"audio[src*='bg.mp3'], audio source[src*='bg.mp3'], audio"
		);
		audios.forEach((audio) => {
			const audioElement =
				audio.tagName === "AUDIO" ? audio : audio.parentElement;
			if (audioElement && !audioElements.includes(audioElement)) {
				audioElements.push(audioElement);
			}
		});
	};

	const playAllAudio = async () => {
		audioElements.forEach((audio) => {
			if (audio && !audio.paused) return;
			audio.play().catch((error) => {});
		});
	};

	const handleInteraction = async () => {
		if (!hasInteracted) {
			hasInteracted = true;
			findAudioElements();
			await playAllAudio();

			document.dispatchEvent(
				new CustomEvent("audio-interaction-ready", {
					bubbles: true,
					cancelable: true,
				})
			);
		}
	};

	const events = [
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

	events.forEach((eventType) => {
		document.addEventListener(eventType, handleInteraction, {
			once: true,
			passive: true,
			capture: true,
		});
	});

	setTimeout(() => {
		findAudioElements();
		playAllAudio();
	}, 1000);
}
