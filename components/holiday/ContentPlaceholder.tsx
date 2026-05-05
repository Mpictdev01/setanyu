import React from 'react';

interface ContentPlaceholderProps {
	label?: string;
}

const ContentPlaceholder = ({ label }: ContentPlaceholderProps) => (
	<div className="w-full h-full min-h-[150px] flex flex-col items-center justify-center border-2 border-dashed border-white/20 bg-black/20 rounded-lg p-4 text-center group">
		<span className="text-4xl opacity-20 mb-2 group-hover:scale-110 transition-transform">🕸️</span>
		<span className="text-yellow-200/50 font-mono text-sm tracking-widest animate-pulse">
			{label || "[ AREA KONTEN WEB ANDA ]"}
		</span>
	</div>
);

export default ContentPlaceholder;
