"use client";

import React from "react";

const ImageViewer = () => {
	return (
		<div className="w-full h-full">
			{/* Display Area */}
			<div className="w-full h-full flex items-center justify-center overflow-hidden">
				<video
					src="/vid/blacki.mp4"
					className="w-full h-full object-cover"
					autoPlay
					loop
					muted
					playsInline
				/>
			</div>
		</div>
	);
};

export default ImageViewer;