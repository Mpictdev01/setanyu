"use client";

import { useEffect, useState } from "react";
import { HolidaySidePanel } from "./holiday";
import { useProjectConfig } from "@/lib/useProjectConfig";

interface TokenData {
	marketCap?: number;
	priceUsd?: string;
	liquidity?: {
		usd?: number;
	};
}

const StatsWindow = () => {
	const { config } = useProjectConfig();
	const [data, setData] = useState<TokenData | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!config?.contract_address) return;

		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch(
					`https://api.dexscreener.com/latest/dex/tokens/${config.contract_address}`
				);
				const json = await res.json();
				if (json.pairs && json.pairs.length > 0) {
					// Use the first pair (usually the most liquid)
					setData(json.pairs[0]);
				}
			} catch (error) {
				console.error("Failed to fetch DexScreener data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 60000); // 1 min refresh

		return () => clearInterval(interval);
	}, [config?.contract_address]);

	const formatCurrency = (val?: number) => {
		if (val === undefined) return "---";
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(val);
	};

	const formatPrice = (val?: string) => {
		if (!val) return "---";
		const num = parseFloat(val);
		if (num < 0.000001) return val; // Show raw if very small
		return `$${num.toFixed(6)}`;
	};

	return (
		<HolidaySidePanel title="STATS" className="sm:w-[250px] w-full">
			<div className="flex flex-col gap-1 p-1 font-mono text-[10px] text-green-400">
				<div className="flex justify-between items-center bg-black/20 px-2 py-1 rounded border border-white/10">
					<span className="text-white/60">MCAP</span>
					<span className="font-bold">
						{loading ? "..." : formatCurrency(data?.marketCap)}
					</span>
				</div>
				<div className="flex justify-between items-center bg-black/20 px-2 py-1 rounded border border-white/10">
					<span className="text-white/60">LIQ</span>
					<span className="font-bold">
						{loading ? "..." : formatCurrency(data?.liquidity?.usd)}
					</span>
				</div>
				<div className="flex justify-between items-center bg-black/20 px-2 py-1 rounded border border-white/10">
					<span className="text-white/60">PRICE</span>
					<span className="font-bold">
						{loading ? "..." : formatPrice(data?.priceUsd)}
					</span>
				</div>
				<div className="flex justify-between items-center bg-black/20 px-2 py-1 rounded border border-white/10">
					<span className="text-white/60">HOLDERS</span>
					<span className="font-bold">---</span>
				</div>
			</div>
		</HolidaySidePanel>
	);
};

export default StatsWindow;
