"use client";

import { useEffect } from "react";

/**
 * useAntiClone Hook
 * Proteksi website dari cloning, phishing, dan pencurian kode sederhana.
 *
 * Fitur:
 * 1. Domain Lock: Redirect jika dijalankan di domain yang tidak diizinkan.
 * 2. UI Protection: Disable klik kanan, shortcut save/view source.
 * 3. DevTools Discouragement: Loop debugger sederhana.
 */
export function useAntiClone() {
	useEffect(() => {
		// ==========================================
		// 1. CONFIG LOAD
		// ==========================================
		// Ambil config dari window (global) karena dimuat via Script tag
		const config = (window as any).BUDDY_CONFIG?.security;
		
		// Jika tidak ada config keamanan, skip (dev mode safe)
		if (!config) return;

		const { allowedDomains, redirectUrl } = config;

		// ==========================================
		// 2. DOMAIN LOCK
		// ==========================================
		const currentHostname = window.location.hostname;
		
		// Cek apakah hostname saat ini ada di whitelist
		const isAllowed = allowedDomains.some((domain: string) => 
			currentHostname === domain || currentHostname.endsWith("." + domain)
		);

		if (!isAllowed && redirectUrl) {
			// Jika ILEGAL, langsung lempar ke URL lain
			window.location.href = redirectUrl;
			return; // Stop eksekusi
		}

		// ==========================================
		// 3. UI PROTECTION (USER EVENTS)
		// ==========================================
		
		const preventDefault = (e: Event) => e.preventDefault();

		// Disable Right Click
		document.addEventListener("contextmenu", preventDefault);

		// Disable Shortcuts
		const handleKeyDown = (e: KeyboardEvent) => {
			// Ctrl+S (Save), Ctrl+U (View Source), Ctrl+P (Print)
			if (
				(e.ctrlKey && (e.key === "s" || e.key === "u" || e.key === "p")) ||
				// F12 (DevTools)
				e.key === "F12" ||
				// Ctrl+Shift+I (DevTools)
				(e.ctrlKey && e.shiftKey && e.key === "I") ||
                 // Ctrl+Shift+J (DevTools Console)
				(e.ctrlKey && e.shiftKey && e.key === "J") ||
                 // Ctrl+Shift+C (Inspect Element)
				(e.ctrlKey && e.shiftKey && e.key === "C")
			) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		// ==========================================
		// 4. DEVTOOLS TRAP (DEBUGGER LOOP)
		// ==========================================
		// Membuat debugger berhenti berulang kali jika DevTools terbuka
		const devToolsTrick = () => {
             // Hanya aktif di production (bukan localhost) agar tidak mengganggu dev sendiri
			if (currentHostname !== "localhost" && currentHostname !== "127.0.0.1") {
				setInterval(() => {
					const start = new Date().getTime();
					debugger; // TRAP
					const end = new Date().getTime();
                    
                    // Jika debugger aktif (selisih waktu besar), paksa reload atau redirect
                    if (end - start > 100) {
                        // Optional: window.location.href = redirectUrl; 
                    }
				}, 1000);
			}
		};

        // Jalankan trap (delayed start)
        setTimeout(devToolsTrick, 2000);

		// Cleanup (meskipun jarang unmount di layout)
		return () => {
			document.removeEventListener("contextmenu", preventDefault);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
}
