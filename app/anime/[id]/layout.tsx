export default function AnimeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="AnimeSection">
            {children}
        </section>
    )
}