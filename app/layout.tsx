import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Logo } from "@/components/icons";
import { TbChevronUp } from "react-icons/tb";
import Footer from '@/components/Footer';
import NextAuthProvider from '@/lib/NextAuthProvider';
import Script from 'next/script';
export const metadata: Metadata = {
	title: "Anime Vite",
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
		title: "AnimeVite",
		description: siteConfig.description,
		url: siteConfig.siteUrl,
		images: [
			{
				url: "/animevite.png",
				width: 512,
				height: 512,
				alt: "AnimeVite Logo",
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
			<head />
			<body
				
				className={clsx(
					"min-h-screen bg-background antialiased",
				)}
			>
				<NextAuthProvider>
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
