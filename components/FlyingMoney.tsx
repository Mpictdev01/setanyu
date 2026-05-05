"use client";

import { useState, useEffect } from "react";

export default function FlyingMoney() {
	const [isVisible, setIsVisible] = useState(false);
	const [randomTop, setRandomTop] = useState(20);
	const [animationKey, setAnimationKey] = useState(0);

	useEffect(() => {
		const triggerAnimation = () => {
			setRandomTop(Math.floor(Math.random() * 70) + 10); // Between 10% and 80%
			setIsVisible(true);
			setAnimationKey((prev) => prev + 1);

			// Animation takes 4.5 seconds
			setTimeout(() => {
				setIsVisible(false);
			}, 4600);
		};

		// Initial delay then every 5 seconds
		const interval = setInterval(triggerAnimation, 5000);

		return () => clearInterval(interval);
	}, []);

	if (!isVisible) return null;

	return (
		<div
			key={animationKey}
			className="flying-money-container"
			style={{ top: `${randomTop}%` }}>
			<img
				src="/money.gif"
				alt="Flying Money"
				className="flying-money-sprite"
				draggable={false}
			/>
		</div>
	);
}
