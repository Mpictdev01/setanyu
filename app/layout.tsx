import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SecurityCheck from "../components/SecurityCheck";

const pressStart2P = Press_Start_2P({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
	title: "BENJAMIN NETANYAZU",
	description: "im a benjamin netanyazu",
	openGraph: {
		title: "BENJAMIN NETANYAZU",
		description: "im a benjamin netanyazu",
		images: ["/banner.jpg"],
		url: "/",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "BENJAMIN NETANYAZU",
		description: "im a benjamin netanyazu",
		images: ["/banner.jpg"],
	},
	icons: {
		icon: [
			{ url: "/favico/favicon.ico" },
			{ url: "/favico/favicon-32x32.png", sizes: "32x32" },
			{ url: "/favico/favicon-16x16.png", sizes: "16x16" },
		],
	},
};

import CustomCursor from "../components/CustomCursor";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
				/>
			</head>
			<body className={pressStart2P.variable} suppressHydrationWarning>
				<SecurityCheck />
				{/* <CustomCursor /> */}
				{/* FOUC Curtain */}
				<div
					id="fouc-curtain"
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "black",
						zIndex: 99999,
						transition: "opacity 0.5s ease-out",
					}}
				/>
				{children}
				<Script src="https://cdn.tailwindcss.com" strategy="afterInteractive" />
				<Script src="/config.js" strategy="afterInteractive" />
				<Script src="/main.js" strategy="afterInteractive" />
				<Script src="/dex-chart.js" strategy="afterInteractive" />
			</body>
		</html>
	);
}
