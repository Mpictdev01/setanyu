import React from 'react';

interface InstructionBadgeProps {
	text: string;
	type?: "success" | "warning" | "info";
}

const InstructionBadge = ({ text, type = "success" }: InstructionBadgeProps) => {
	const colors = {
		success: "bg-green-600 border-green-400 text-white",
		warning: "bg-red-600 border-red-400 text-white",
		info: "bg-blue-600 border-blue-400 text-white"
	};
	
	return (
		<div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border-2 ${colors[type]} shadow-md mb-4 font-mono text-xs font-bold uppercase tracking-wide`}>
			<span>{type === 'warning' ? '⚠️' : '✅'}</span>
			{text}
		</div>
	);
};

export default InstructionBadge;
