"use client";

import { useState, useEffect } from "react";

const Calendar = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	// Calculate current date based on US Time (EST/New York)
	const getUSDateParts = (date: Date) => {
		const formatter = new Intl.DateTimeFormat("en-US", {
			timeZone: "America/New_York",
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});
		const parts = formatter.formatToParts(date);
		const result: Record<string, number> = {};
		parts.forEach((part) => {
			if (part.type !== "literal") {
				result[part.type] = parseInt(part.value);
			}
		});
		return result;
	};

	const usParts = getUSDateParts(currentTime);
	const today = usParts.day;
	const currentMonth = usParts.month - 1; // 0-indexed for comparison
	const currentYear = usParts.year;

	// Calendar grid
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

	// Generate calendar days
	const calendarDays = [];
	// Empty cells for days before month starts
	for (let i = 0; i < firstDayOfMonth; i++) {
		calendarDays.push(null);
	}
	// Days of the month
	for (let day = 1; day <= daysInMonth; day++) {
		calendarDays.push(day);
	}

	return (
		<div className="flex flex-col gap-1 w-full">
			{/* Calendar Grid */}
			<div className="w-full">
				{/* Day Headers */}
				<div className="grid grid-cols-7 gap-0.5 mb-0.5">
					{["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
						<div
							key={idx}
							className="text-center"
							style={{
								fontFamily:
									'var(--font-press-start-2p), "Press Start 2P", monospace',
								fontSize: "5px",
								color: "#FFFFFF",
								WebkitTextStroke: "none",
								textShadow: "none",
								lineHeight: "1",
							}}>
							{day}
						</div>
					))}
				</div>

				{/* Calendar Days */}
				<div className="grid grid-cols-7 gap-0.5">
					{calendarDays.map((day, idx) => {
						if (day === null) {
							return (
								<div
									key={idx}
									className="aspect-square"
									style={{ minHeight: "0" }}
								/>
							);
						}
						const isToday = day === today;
						const isSpecialDay = currentMonth === 11 && day === 24; // December = 11, day 24 (Xmas Eve)
						return (
							<div
								key={idx}
								className={`aspect-square flex items-center justify-center border rounded ${
									isSpecialDay
										? "border-[#DC143C]"
										: isToday
										? "border-[#F5BE3C]"
										: "border-black"
								}`}
								style={{
									backgroundColor: isSpecialDay
										? "#FF4500"
										: isToday
										? "#FF7F50"
										: "#008080",
									backgroundImage:
										isSpecialDay || isToday
											? "none"
											: `repeating-linear-gradient(0deg, transparent, transparent 1px, #006666 1px, #006666 2px)`,
									boxShadow:
										isSpecialDay || isToday
											? "inset 0 0 0 1px #000000"
											: "inset 0 0 0 0.5px #000000",
									borderWidth: "1px",
									minHeight: "0",
								}}>
								<span
									style={{
										fontFamily:
											'var(--font-press-start-2p), "Press Start 2P", monospace',
										fontSize: "6px",
										color: "#FFFFFF",
										WebkitTextStroke: "none",
										textShadow: "none",
										lineHeight: "1",
									}}>
									{day}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Calendar;
