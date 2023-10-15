import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import Footer from '@/components/Footer';
import NextAuthProvider from '@/lib/NextAuthProvider';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
export const metadata: Metadata = {
	title: "Anime Astra | Watch Anime Online for Free in HD Quality",
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.ico",
	},
	openGraph: {
		title: "AnimeAstra",
		description: siteConfig.description,
		url: siteConfig.siteUrl,
		images: [
			{
				url: "/animevite.png",
				width: 512,
				height: 512,
				alt: "AnimeAstra Logo",
			},
		],

	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
	}) {

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="google-site-verification" content="d8Q9bSGyoBL8RSathwiLAJd3qbQhUcl_au7udJd5XZo" />
			</head>
			<body
				
				className={clsx(
					"min-h-screen bg-background antialiased",
				)}
			>
				<NextAuthProvider>
					<Analytics />
					<Script src="https://kit.fontawesome.com/79101233a3.js" crossOrigin="anonymous"></Script>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						<div className="relative flex flex-col h-screen">
							<Navbar />
							<main >
								{children}
							</main>
							<Footer />
						</div>
					</Providers>
				</NextAuthProvider>
			</body>
		</html>
	);
}
