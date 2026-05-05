const BUDDY_CONFIG = {
	contractAddress: "AoZgWDFcGd3ZNvEgvZDWXMXngrqsPtiFvsA4mypnpump",

	security: {
		allowedDomains: ["localhost", "127.0.0.1", "donaldgrump.xyz"],
		redirectUrl: "https://twitter.com/donaldgrump",
	},

	social: {
		twitter: "https://x.com/donaldgrump",
		communities: "https://x.com/i/communities/donaldgrump",
	},

	trading: {
		pumpfun: "https://pump.fun/",
		dexscreener: "https://dexscreener.com/",
	},

	project: {
		name: "DONALD GRUMP",
		symbol: "DONALD GRUMP",
		description: "$DONALD GRUMP",
		website: "",
		whitepaper: "",
		github: "",
	},

	display: {
		comingSoonText: "comingsoon",
		copyButtonText: "Copy CA",
		copySuccessText: "Contract Address copied!",
		copyErrorText: "Failed to copy Contract Address",
	},

	hasContractAddress: function () {
		return this.contractAddress && this.contractAddress.trim() !== "";
	},

	getPumpfunLink: function () {
		if (this.hasContractAddress()) {
			return `https://pump.fun/coin/${this.contractAddress}`;
		}
		return this.trading.pumpfun;
	},

	getDexscreenerLink: function () {
		if (this.hasContractAddress()) {
			return `https://dexscreener.com/solana/${this.contractAddress}`;
		}
		return this.trading.dexscreener;
	},

	getContractDisplayText: function () {
		if (this.hasContractAddress()) {
			return this.contractAddress;
		}
		return this.display.comingSoonText;
	},

	getActiveSocialLinks: function () {
		const activeLinks = {};
		for (const [platform, url] of Object.entries(this.social)) {
			if (url && url.trim() !== "") {
				activeLinks[platform] = url;
			}
		}
		return activeLinks;
	},
};

if (typeof module !== "undefined" && module.exports) {
	module.exports = BUDDY_CONFIG;
}

if (typeof window !== "undefined") {
	window.BUDDY_CONFIG = BUDDY_CONFIG;
}
