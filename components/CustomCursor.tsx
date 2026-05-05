"use client";

import React, { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(false);

	const onMouseMove = (e: MouseEvent) => {
		const { clientX: x, clientY: y } = e;
		setPosition({ x, y });
		if (!isVisible) setIsVisible(true);
	};

	const onMouseLeave = () => setIsVisible(false);
	const onMouseEnter = () => setIsVisible(true);

	useEffect(() => {
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseenter", onMouseEnter);
		window.addEventListener("mouseleave", onMouseLeave);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseenter", onMouseEnter);
			window.removeEventListener("mouseleave", onMouseLeave);
		};
	}, [isVisible]);

	return (
		<div
			style={{
				display: isVisible ? "block" : "none",
				position: "fixed",
				left: position.x,
				top: position.y,
				width: "64px",
				height: "64px",
				pointerEvents: "none",
				zIndex: 999999,
				transform: "translate(-4px, -4px)", // Adjusted offset for larger size
			}}>
			<img
				src="/cur.gif"
				alt="cursor"
				className="w-full h-full object-contain"
			/>
		</div>
	);
};

export default CustomCursor;
