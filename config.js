// ========================================
// BUDDY PROJECT CONFIGURATION
// ========================================
// File konfigurasi terpusat untuk mengelola semua tautan eksternal dan alamat kontrak
// Update file ini untuk mengubah semua tautan di seluruh website

const BUDDY_CONFIG = {
	// ========================================
	// CONTRACT ADDRESS (CA) CONFIGURATION
	// ========================================
	// Kosongkan jika belum ada CA, isi dengan CA sebenarnya setelah rilis
	contractAddress: "AqAdtE8mQTDvTcoYbUGuMMVezVjHDHqiLARJ5k1Apump", // Contoh: "ABC123...XYZ789" atau "" untuk Coming Soon

	// ========================================
	// SOCIAL MEDIA LINKS
	// ========================================
	social: {
		twitter: "https://x.com/donaldgrump", // Ganti dengan handle Twitter sebenarnya
		communities: "https://x.com/i/communities/donaldgrump", // Ganti dengan link komunitas
	},

	// ========================================
	// TRADING & CHART PLATFORMS
	// ========================================
	trading: {
		// Pump.fun - akan otomatis update ke pump.fun/coin/{CA} jika CA tersedia
		pumpfun: "https://pump.fun",

		// DexScreener - akan otomatis update ke dexscreener.com/solana/{CA} jika CA tersedia
		dexscreener: "https://dexscreener.com/solana/",
	},

	// ========================================
	// PROJECT INFORMATION
	// ========================================
	project: {
		name: "DONALD GRUMP",
		symbol: "DONALD GRUMP",
		description: "$DONALD GRUMP",
		website: "", // Ganti dengan website resmi jika ada
		whitepaper: "", // Ganti dengan link whitepaper jika ada
		github: "", // Ganti dengan link GitHub jika ada
	},

	// ========================================
	// DISPLAY SETTINGS
	// ========================================
	display: {
		// Teks yang ditampilkan jika CA kosong
		comingSoonText: "Coming Soon",

		// Teks untuk tombol copy CA
		copyButtonText: "Copy CA",

		// Teks untuk notifikasi copy berhasil
		copySuccessText: "Contract Address copied!",

		// Teks untuk notifikasi copy gagal
		copyErrorText: "Failed to copy Contract Address",
	},

	// ========================================
	// UTILITY FUNCTIONS
	// ========================================

	// Cek apakah CA sudah tersedia
	hasContractAddress: function () {
		return this.contractAddress && this.contractAddress.trim() !== "";
	},

	// Dapatkan link Pump.fun yang sudah disesuaikan
	getPumpfunLink: function () {
		if (this.hasContractAddress()) {
			return `https://pump.fun/coin/${this.contractAddress}`;
		}
		return this.trading.pumpfun;
	},

	// Dapatkan link DexScreener yang sudah disesuaikan
	getDexscreenerLink: function () {
		if (this.hasContractAddress()) {
			return `https://dexscreener.com/solana/${this.contractAddress}`;
		}
		return this.trading.dexscreener;
	},

	// Dapatkan teks yang akan ditampilkan untuk CA
	getContractDisplayText: function () {
		if (this.hasContractAddress()) {
			return this.contractAddress;
		}
		return this.display.comingSoonText;
	},

	// Dapatkan semua link sosial yang aktif (tidak kosong)
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

// ========================================
// EXPORT CONFIGURATION
// ========================================
// Export untuk digunakan di file lain
if (typeof module !== "undefined" && module.exports) {
	module.exports = BUDDY_CONFIG;
}

// Global access untuk browser
if (typeof window !== "undefined") {
	window.BUDDY_CONFIG = BUDDY_CONFIG;
}
