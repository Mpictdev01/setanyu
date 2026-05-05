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

		if (!this.window || !this.chartEmbed) {
			return;
		}
	}

	open() {
		if (!this.window) {
			return;
		}

		try {
			this.isOpen = true;
			this.window.style.display = "block";
			this.window.classList.add("active");

			setTimeout(() => {
				this.loadChart();
			}, 100);
		} catch (error) {}
	}

	close() {
		if (!this.window) return;

		this.isOpen = false;
		this.window.style.display = "none";
		this.window.classList.remove("active");

		this.clearChart();
	}

	loadChart() {
		if (!this.chartEmbed) return;

		this.chartEmbed.innerHTML =
			'<div class="loading-message">Loading chart...</div>';

		const contractAddress = BUDDY_CONFIG.contractAddress;

		if (!contractAddress || contractAddress.trim() === "") {
			this.chartEmbed.innerHTML = `
                <div class="loading-message">
                    <h3>Chart Not Available</h3>
                    <p>Contract address not set yet.</p>
                    <p>Chart will be available after token launch.</p>
                </div>
            `;
			return;
		}

		const embedUrl = this.getDexscreenerEmbedUrl(contractAddress);

		const iframe = document.createElement("iframe");
		iframe.src = embedUrl;
		iframe.width = "100%";
		iframe.height = "100%";
		iframe.frameBorder = "0";
		iframe.allowTransparency = "true";
		iframe.allow = "fullscreen";
		iframe.title = "BUDDY Chart - DexScreener";

		this.chartEmbed.innerHTML = "";
		this.chartEmbed.appendChild(iframe);
	}

	getDexscreenerEmbedUrl(contractAddress) {
		return `https://dexscreener.com/solana/${contractAddress}?embed=1&theme=dark&trades=0&info=0`;
	}

	clearChart() {
		if (this.chartEmbed) {
			this.chartEmbed.innerHTML = "";
		}
	}

	openBuyLink() {
		const buyUrl = BUDDY_CONFIG.getPumpfunLink();
		window.open(buyUrl, "_blank", "noopener,noreferrer");
	}

	openDexLink() {
		const dexUrl = BUDDY_CONFIG.getDexscreenerLink();
		window.open(dexUrl, "_blank", "noopener,noreferrer");
	}
}

let dexChartManager = null;

document.addEventListener("DOMContentLoaded", function () {
	dexChartManager = new DexChartManager();
});

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

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && dexChartManager && dexChartManager.isOpen) {
		closeDexWindow();
	}
});

window.addEventListener("resize", function () {
	if (dexChartManager && dexChartManager.isOpen) {
		const window = dexChartManager.window;
		if (window) {
			window.style.transform = "translate(-50%, -50%)";
		}
	}
});
