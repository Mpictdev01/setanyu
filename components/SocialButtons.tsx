"use client";

import { useEffect, useState } from "react";

export default function SocialButtons() {
	const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

	useEffect(() => {
		// Wait for config to load
		const checkConfig = setInterval(() => {
			if (window.BUDDY_CONFIG) {
				const links = window.BUDDY_CONFIG.getActiveSocialLinks();
				setSocialLinks(links);
				clearInterval(checkConfig);
			}
		}, 100);

		return () => clearInterval(checkConfig);
	}, []);

	const handleChartClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (window.openDexWindow) {
			window.openDexWindow();
		}
	};

	return (
		<div className="social-section" id="social-buttons">
			{Object.entries(socialLinks).map(([platform, url]) => (
				<button key={platform} className="social-btn">
					<a href={url} target="_blank" rel="noreferrer">
						{platform}
					</a>
				</button>
			))}
			<button className="social-btn" onClick={handleChartClick}>
				Chart
			</button>
		</div>
	);
}
