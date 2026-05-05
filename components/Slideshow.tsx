"use client";

import { useEffect, useState } from "react";

const slides = [
	{ type: "image", src: "/meme/images_1.avif", alt: "slide 1" },
	{ type: "image", src: "/meme/images_2.avif", alt: "slide 2" },
	{ type: "image", src: "/meme/images_3.avif", alt: "slide 3" },
	{ type: "image", src: "/meme/images_4.avif", alt: "slide 4" },
	{ type: "image", src: "/meme/images_5.avif", alt: "slide 5" },
	{ type: "image", src: "/meme/images_6.avif", alt: "slide 6" },
	{ type: "image", src: "/meme/images_7.avif", alt: "slide 7" },
	{ type: "image", src: "/meme/images_8.avif", alt: "slide 8" },
];

export default function Slideshow() {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const changeSlide = (direction: number) => {
		setCurrentSlide((prev) => {
			const next = prev + direction;
			if (next >= slides.length) return 0;
			if (next < 0) return slides.length - 1;
			return next;
		});
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	return (
		<div className="relative slideshow-container h-full">
			<div className="w-full h-full overflow-hidden rounded-[14px] border border-white/20 shadow-inner">
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`slideshow-slide ${
							index === currentSlide ? "active" : ""
						}`}
						style={{ borderRadius: "14px !important" }}>
						{slide.type === "image" ? (
							<img
								src={slide.src}
								className="relative z-10 opacity-100 transition-transform-opacity motion-reduce:transition-none !duration-300 w-full h-full object-cover rounded-[14px]"
								alt={slide.alt}
								draggable={false}
							/>
						) : (
							<video
								className="relative z-10 opacity-100 transition-transform-opacity motion-reduce:transition-none !duration-300 w-full h-full object-cover rounded-[14px]"
								autoPlay
								muted
								loop>
								<source src={slide.src} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						)}
					</div>
				))}
			</div>

			{/* Navigation Buttons */}
			<div className="slideshow-nav">
				<button
					onClick={(e) => {
						e.preventDefault();
						changeSlide(-1);
					}}
					className="slideshow-btn slideshow-prev"
					type="button">
					<span>❮</span>
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						changeSlide(1);
					}}
					className="slideshow-btn slideshow-next"
					type="button">
					<span>❯</span>
				</button>
			</div>

			{/* Indicators */}
			<div className="slideshow-indicators">
				{slides.map((_, index) => (
					<span
						key={index}
						className={`indicator ${index === currentSlide ? "active" : ""}`}
						onClick={() => goToSlide(index)}></span>
				))}
			</div>
		</div>
	);
}
