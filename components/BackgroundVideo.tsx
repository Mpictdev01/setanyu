"use client";

export default function BackgroundVideo() {
	return (
		<>
			<img
				src="/bg2.avif"
				alt="Background"
				className="fixed inset-0 w-full h-full object-cover z-[-2]"
				draggable={false}
			/>
		</>
	);
}
