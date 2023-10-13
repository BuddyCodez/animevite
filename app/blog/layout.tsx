import { Metadata, ResolvingMetadata } from 'next';
export const metadata: Metadata = {
	title: 'Anime Details'
}
export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="BlogSection">
			{children}
		</section>
	);
}
