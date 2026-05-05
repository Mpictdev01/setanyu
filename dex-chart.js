// ========================================
// DEXSCREENER CHART MANAGEMENT
// ========================================
// File terpisah untuk mengelola chart DexScreener

class DexChartManager {
	constructor() {
		this.window = null;
		this.chartEmbed = null;
		this.isOpen = false;
		this.init();
	}

	init() {
		this.window = document.getElementById("dex-window");
		this.chartEmbed = document.getElementById("chart-embed");

		if (!this.window) {
			console.error("DexChartManager: dex-window element not found");
			return;
		}

		if (!this.chartEmbed) {
			console.error("DexChartManager: chart-embed element not found");
			return;
		}

		console.log("DexChartManager: Initialized successfully");

		// Window is not draggable
	}

	// Open chart window
	open() {
		if (!this.window) {
			console.error("DexChartManager: Window element not found");
			return;
		}

		try {
			this.isOpen = true;
			this.window.style.display = "block";
			this.window.classList.add("active");

			// Load chart after a short delay to ensure window is visible
			setTimeout(() => {
				this.loadChart();
			}, 100);
		} catch (error) {
			console.error("DexChartManager: Error opening window:", error);
		}
	}

	// Close chart window
	close() {
		if (!this.window) return;

		this.isOpen = false;
		this.window.style.display = "none";
		this.window.classList.remove("active");

		// Clear chart content
		this.clearChart();
	}

	// Load DexScreener chart
	loadChart() {
		if (!this.chartEmbed) return;

		// Show loading message
		this.chartEmbed.innerHTML =
			'<div class="loading-message">Loading chart...</div>';

		// Get contract address from config
		const contractAddress = GRUMP_CONFIG.contractAddress;

		if (!contractAddress || contractAddress.trim() === "") {
			// No contract address - show placeholder
			this.chartEmbed.innerHTML = `
                <div class="loading-message">
                    <h3>Chart Not Available</h3>
                    <p>Contract address not set yet.</p>
                    <p>Chart will be available after token launch.</p>
                </div>
            `;
			return;
		}

		// Create DexScreener embed URL
		const embedUrl = this.getDexscreenerEmbedUrl(contractAddress);

		// Create iframe
		const iframe = document.createElement("iframe");
		iframe.src = embedUrl;
		iframe.width = "100%";
		iframe.height = "100%";
		iframe.frameBorder = "0";
		iframe.allowTransparency = "true";
		iframe.allow = "fullscreen";
		iframe.title = "GRUMP Chart - DexScreener";

		// Handle iframe load
		iframe.onload = () => {
			console.log("DexScreener chart loaded successfully");
		};

		iframe.onerror = () => {
			this.chartEmbed.innerHTML = `
                <div class="loading-message">
                    <h3>Chart Load Error</h3>
                    <p>Failed to load chart. Please try again.</p>
                </div>
            `;
		};

		// Replace loading message with iframe
		this.chartEmbed.innerHTML = "";
		this.chartEmbed.appendChild(iframe);
	}

	// Get DexScreener embed URL
	getDexscreenerEmbedUrl(contractAddress) {
		// DexScreener embed URL format
		return `https://dexscreener.com/solana/${contractAddress}?embed=1&theme=dark&trades=0&info=0`;
	}

	// Clear chart content
	clearChart() {
		if (this.chartEmbed) {
			this.chartEmbed.innerHTML = "";
		}
	}

	// Open buy link
	openBuyLink() {
		const buyUrl = BUDDY_CONFIG.getPumpfunLink();
		window.open(buyUrl, "_blank", "noopener,noreferrer");
	}

	// Open DexScreener link
	openDexLink() {
		const dexUrl = BUDDY_CONFIG.getDexscreenerLink();
		window.open(dexUrl, "_blank", "noopener,noreferrer");
	}
}

// ========================================
// GLOBAL FUNCTIONS
// ========================================

let dexChartManager = null;

// Initialize DexChartManager when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
	dexChartManager = new DexChartManager();
});

// Global functions for HTML onclick events
function openDexWindow() {
	if (dexChartManager) {
		dexChartManager.open();
	}
}

function closeDexWindow() {
	if (dexChartManager) {
		dexChartManager.close();
	}
}

function openBuyLink() {
	if (dexChartManager) {
		dexChartManager.openBuyLink();
	}
}

function openDexLink() {
	if (dexChartManager) {
		dexChartManager.openDexLink();
	}
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener("keydown", function (e) {
	// ESC key to close chart window
	if (e.key === "Escape" && dexChartManager && dexChartManager.isOpen) {
		closeDexWindow();
	}
});

// ========================================
// WINDOW RESIZE HANDLER
// ========================================

window.addEventListener("resize", function () {
	// Re-center window on resize
	if (dexChartManager && dexChartManager.isOpen) {
		const window = dexChartManager.window;
		if (window) {
			// Reset to center position
			window.style.transform = "translate(-50%, -50%)";
		}
	}
});
