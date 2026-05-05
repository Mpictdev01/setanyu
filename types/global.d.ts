// Global type definitions for BUDDY_CONFIG and Window extensions

interface BUDDYConfig {
	contractAddress: string;
	hasContractAddress: () => boolean;
	getPumpfunLink: () => string;
	getDexscreenerLink: () => string;
	getContractDisplayText: () => string;
	getActiveSocialLinks: () => Record<string, string>;
	display: {
		comingSoonText: string;
		copyButtonText: string;
		copySuccessText: string;
		copyErrorText: string;
	};
}

interface MOOBConfig {
	contractAddress: string;
	hasContractAddress: () => boolean;
	getPumpfunLink: () => string;
	getDexscreenerLink: () => string;
	getContractDisplayText: () => string;
	getActiveSocialLinks: () => Record<string, string>;
}

declare global {
	interface Window {
		BUDDY_CONFIG?: BUDDYConfig;
		MOOB_CONFIG?: MOOBConfig;
		openDexWindow?: () => void;
		copyCA?: () => void;
		dexChartManager?: {
			open: () => void;
			close: () => void;
			openBuyLink: () => void;
			openDexLink: () => void;
			isOpen: boolean;
		};
	}
}

export {};
