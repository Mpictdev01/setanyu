"use client";

import { useEffect, useState } from "react";
import Slideshow from "./Slideshow";

export default function SidePanel() {
	const [moobLevel, setMoobLevel] = useState("60% — Moobinator");
	const [sliderValue, setSliderValue] = useState(7);

  const moobLevels: Record<number, string> = {
		1: "0% — Moobless",
		2: "10% — Mooblet",
		3: "20% — Moobing",
		4: "30% — Moobster",
		5: "40% — Mooblord",
		6: "50% — Moobzilla",
		7: "60% — Moobinator",
		8: "70% — Moobaholic",
		9: "80% — Moobfather",
		10: "90% — MoobKing",
		11: "100% — Moobgod",
	};

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		setSliderValue(value);
		setMoobLevel(moobLevels[value] || "");
	};

  return (
    <div className="flex flex-col gap-3">
      {/* Slider Window */}
      <div className="window sm:w-[250px] w-full">
        <div className="title-bar">
					<div
						className="title-bar-text"
						style={{
							fontSize: "0.75rem",
							WebkitTextStroke: "none",
							textShadow: "none",
						}}>
						BUDDY
					</div>
        </div>
        <div className="window-body">
					<p className="text-md">How BUDDY are you?</p>
          <div className="field-row">
            <label htmlFor="range26">Low</label>
            <input
              id="range26"
              max="11"
              min="1"
              type="range"
              value={sliderValue}
              onChange={handleSliderChange}
            />
            <label htmlFor="range26">High</label>
          </div>
          <p id="moob-level-text" className="text-center text-sm mt-2">
            {moobLevel}
          </p>
        </div>
        <div className="status-bar">
          <p className="status-bar-field">TRUST</p>
          <p className="status-bar-field">IN</p>
					<p className="status-bar-field">BUDDY</p>
        </div>
      </div>

      {/* Meme Images Window */}
      <div className="window sm:w-[250px] w-full">
        <div className="title-bar">
					<div
						className="title-bar-text"
						style={{
							fontSize: "0.75rem",
							WebkitTextStroke: "none",
							textShadow: "none",
						}}>
						BUDDY TV
					</div>
        </div>
        <div className="window-body flex flex-col gap-3">
          <Slideshow />
          <div className="relative rounded-large">
            <video
              src="/img/vid/coding.mp4"
              className="relative z-10 opacity-100 transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-none sm:aspect-auto aspect-square"
              autoPlay
              muted
              loop
							width="250">
              <source src="/img/vid/coding.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
	);
}
