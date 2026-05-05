"use client";

import { useEffect, useState } from "react";

export default function BuyButton() {
	const [buyLink, setBuyLink] = useState("#");

	useEffect(() => {
		const checkConfig = setInterval(() => {
			if (window.BUDDY_CONFIG) {
				setBuyLink(window.BUDDY_CONFIG.getPumpfunLink());
				clearInterval(checkConfig);
			}
		}, 100);

		return () => clearInterval(checkConfig);
	}, []);

	return (
		<div className="buy-section">
			<a
				href={buyLink}
				id="buy-button-link"
				target="_blank"
				rel="noreferrer"
				className="buy-button">
				<div className="buy-button-top">BUY BUDDY</div>
				<div className="buy-button-bottom"></div>
				<div className="buy-button-base"></div>
			</a>
		</div>
	);
}
