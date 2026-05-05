"use client";

import { useAntiClone } from "../hooks/useAntiClone";

/**
 * SecurityCheck Component
 * Komponen Client-side khusus untuk menjalankan hook keamanan (useAntiClone).
 * Ini diperlukan karena layout.tsx adalah Server Component.
 */
export default function SecurityCheck() {
	useAntiClone(); // Jalankan proteksi
	return null; // Komponen ini tidak merender UI apa pun
}
