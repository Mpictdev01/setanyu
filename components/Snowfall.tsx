"use client";

import { useEffect } from "react";

export default function Snowfall() {
	useEffect(() => {
		// Create snowflakes dynamically
		const createSnowflake = () => {
			const snowflake = document.createElement("div");
			snowflake.className = "snowflake";

			// Random size between 2px and 8px
			const size = Math.random() * 6 + 2;
			snowflake.style.width = `${size}px`;
			snowflake.style.height = `${size}px`;

			// Random starting position
			snowflake.style.left = `${Math.random() * 100}%`;

			// Random animation duration (10-20 seconds)
			const duration = Math.random() * 10 + 10;
			snowflake.style.animationDuration = `${duration}s`;

			// Random delay
			const delay = Math.random() * 5;
			snowflake.style.animationDelay = `${delay}s`;

			// Random opacity
			snowflake.style.opacity = `${Math.random() * 0.8 + 0.2}`;

			// Random horizontal drift
			const drift = Math.random() * 50 - 25;
			snowflake.style.setProperty("--drift", `${drift}px`);

			return snowflake;
		};

		// Create container if it doesn't exist
		let container = document.getElementById("snowfall-container");
		if (!container) {
			container = document.createElement("div");
			container.id = "snowfall-container";
			container.className = "snowfall-container";
			document.body.appendChild(container);
		}

		// Create initial snowflakes
		const snowflakeCount = 50;
		for (let i = 0; i < snowflakeCount; i++) {
			const snowflake = createSnowflake();
			container.appendChild(snowflake);
		}

		// Continuously add new snowflakes to maintain count
		const intervalId = setInterval(() => {
			const existingSnowflakes = container.querySelectorAll(".snowflake");
			if (existingSnowflakes.length < snowflakeCount) {
				const snowflake = createSnowflake();
				container.appendChild(snowflake);

				// Remove after animation completes
				const duration = parseFloat(snowflake.style.animationDuration) * 1000;
				setTimeout(() => {
					if (snowflake.parentNode) {
						snowflake.parentNode.removeChild(snowflake);
					}
				}, duration + 1000);
			}
		}, 2000);

		// Cleanup function
		return () => {
			clearInterval(intervalId);
			if (container && container.parentNode) {
				container.parentNode.removeChild(container);
			}
		};
	}, []);

	return null;
}

