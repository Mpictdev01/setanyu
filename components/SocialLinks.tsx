"use client";

import { useProjectConfig } from "@/lib/useProjectConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SocialLinks() {
	const { config } = useProjectConfig();
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Render a stable container with the same dimensions/layout even if loading,
	// but only render dynamic buttons after mount to avoid hydration mismatch.
	// However, since we want SSR to match Client Initial, and config is null on Server,
	// checking `config` is safe as long as the structure is stable.
	// The key is to avoid inserting/removing the specialized internal nodes unexpectedly.

	if (!mounted) {
		// Return static skeleton or just the static buttons
		return (
			<div className="flex flex-col gap-3 items-start min-h-[50px]">
				<button
					onClick={() => router.push("/dome")}
					className="text-white/80 hover:text-white text-sm font-bold tracking-wider drop-shadow-md hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all flex items-center gap-2 group pr-4"
					aria-label="Dome">
					<span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">
						▶
					</span>
					DOME
				</button>
			</div>
		);
	}

	// Helper for buy link
	const getBuyUrl = () => {
		if (!config || !config.buy_platform) return null;
		let baseUrl = '';
		if (config.buy_platform === 'pumpfun') {
			baseUrl = 'https://pump.fun/coin/';
		} else if (config.buy_platform === 'jup') {
			baseUrl = 'https://jup.ag/swap/SOL-';
		}
		return config.contract_address ? `${baseUrl}${config.contract_address}` : null;
	};

	const chartUrl = config?.dexscreener_url || null;
	const buyUrl = getBuyUrl();

	// Force remount when switching from server/static state to client state
	// This prevents hydration mismatches and insertBefore/removeChild errors
	// caused by diffing widely different structures or invisible characters.
	return (
		<div
			key={mounted ? "client-mounted" : "server-loading"}
			className="flex flex-col gap-2 items-start w-[200px]">
			{/* Twitter Button (Blue) */}
			<a
				href={config?.twitter_url || "#"}
				target="_blank"
				rel="noopener noreferrer"
				className="w-full flex items-center justify-between group no-underline bg-[#0038b8] hover:bg-[#002277] border border-[#0038b8] backdrop-blur-md shadow-lg rounded-lg px-4 py-2 text-white transition-all hover:scale-[1.02] active:scale-95"
				aria-label="Twitter">
				<span className="text-xs font-bold tracking-wider drop-shadow-md">TWITTER</span>
				<span className="text-[10px] opacity-70 group-hover:opacity-100">↗</span>
			</a>

			{/* Community Button (White) */}
			<a
				href={config?.community_url || "#"}
				target="_blank"
				rel="noopener noreferrer"
				className="w-full flex items-center justify-between group no-underline bg-white hover:bg-gray-100 border border-white backdrop-blur-md shadow-lg rounded-lg px-4 py-2 text-[#0038b8] transition-all hover:scale-[1.02] active:scale-95"
				aria-label="Community">
				<span className="text-xs font-black tracking-wider">COMMUNITY</span>
				<span className="text-[10px] opacity-70 group-hover:opacity-100">↗</span>
			</a>

			{/* Chart Button (Blue) */}
			<a
				href={chartUrl || "#"}
				target="_blank"
				rel="noopener noreferrer"
				className="w-full flex items-center justify-between group no-underline bg-[#0038b8] hover:bg-[#002277] border border-[#0038b8] backdrop-blur-md shadow-lg rounded-lg px-4 py-2 text-white transition-all hover:scale-[1.02] active:scale-95"
				aria-label="Chart">
				<span className="text-xs font-bold tracking-wider drop-shadow-md">CHART</span>
				<span className="text-[10px] opacity-70 group-hover:opacity-100">↗</span>
			</a>
		</div>
	);
}
