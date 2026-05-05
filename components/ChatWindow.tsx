"use client";

import React from "react";
import { HolidaySidePanel } from "./holiday";

const ChatWindow = () => {
	return (
		<HolidaySidePanel title="CHAT" className="sm:w-[250px] w-full">
			<div
				className="w-full relative bg-black/40 rounded-xl overflow-hidden border border-white/20 backdrop-blur-md shadow-inner"
				style={{ height: "330px" }}>
				<div className="frutiger-aero-noise" style={{ opacity: 0.1 }} />
				<iframe
					src="https://www3.cbox.ws/box/?boxid=3538504&boxtag=UmkQUi"
					width="100%"
					height="100%"
					allow="autoplay"
					style={{ border: "none", position: "relative", zIndex: 10 }}
				/>
			</div>
		</HolidaySidePanel>
	);
};

export default ChatWindow;
