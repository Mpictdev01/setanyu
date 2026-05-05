"use client";

import React from "react";

const LoveMarquee = () => {
	return (
		<div className="w-full max-w-[80vw] mx-auto mb-2 overflow-hidden relative bg-white border-t-4 border-b-4 border-[#0038b8] shadow-md py-1 h-10 flex items-center">
			<div className="animate-marquee whitespace-nowrap flex">
				{/* Doubling the items to ensure seamless loop */}
				{[...Array(20)].map((_, i) => (
					<span
						key={i}
						className="mx-4 font-black text-2xl tracking-widest text-[#0038b8]">
						$BENJAMIN
					</span>
				))}
				{[...Array(20)].map((_, i) => (
					<span
						key={`dup-${i}`}
						className="mx-4 font-black text-2xl tracking-widest text-[#0038b8]">
						$BENJAMIN
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
