"use client";

import React from "react";

const LoveMarquee = () => {
	return (
		<div className="w-full max-w-[80vw] mx-auto mb-2 overflow-hidden relative rounded-xl border border-white/20 bg-black/20 backdrop-blur-md shadow-inner py-1 h-8 flex items-center">
			<div className="frutiger-aero-noise" style={{ opacity: 0.1 }} />
			<div className="animate-marquee whitespace-nowrap flex">
				{/* Doubling the items to ensure seamless loop */}
				{[...Array(20)].map((_, i) => (
					<span
						key={i}
						className="mx-4 font-bold text-2xl"
						style={{
							background:
								"linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
							backgroundSize: "200% auto",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							animation: "shine 2s linear infinite",
						}}>
						$BENJAMINNETANYAZU
					</span>
				))}
				{[...Array(20)].map((_, i) => (
					<span
						key={`dup-${i}`}
						className="mx-4 font-bold text-2xl"
						style={{
							background:
								"linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
							backgroundSize: "200% auto",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							animation: "shine 2s linear infinite",
						}}>
						$BENJAMINNETANYAZU
					</span>
				))}
			</div>
			{/* Spring Decoration - Left Corner */}
			<img
				src="/spring.gif"
				alt="Spring Left"
				className="absolute -top-10 -left-6 h-20 w-auto z-20 pointer-events-none drop-shadow-md"
				draggable={false}
			/>

			{/* Spring Decoration - Right Corner (Flipped) */}
			<img
				src="/spring.gif"
				alt="Spring Right"
				className="absolute -top-10 -right-6 h-20 w-auto z-20 pointer-events-none drop-shadow-md scale-x-[-1]"
				draggable={false}
			/>

			<style jsx>{`
				@keyframes shine {
					to {
						background-position: 200% center;
					}
				}
			`}</style>
		</div>
	);
};

export default LoveMarquee;
