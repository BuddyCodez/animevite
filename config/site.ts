export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "AnimeAstra",
	description: "Welcome to AnimeAstra - your ultimate destination for all things anime! Find the latest news, reviews, and recommendations for your favorite shows, as well as new discoveries. Join our passionate community of anime fans and explore the fascinating world of Japanese animation like never before. Start your journey on AnimeAstra today!",
	siteUrl: "https://animeastra.vercel.app",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Trending",
			href: "/trending",
		},
		{
			label: "Popular",
			href: "/popular",
		},
		{
			label: "Blog",
			href: "/blog",
		},
		{
			label: "About",
			href: "/about",
		}
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Trending",
			href: "/trending",
		},
		{
			label: "Popular",
			href: "/popular",
		},
		{
			label: "Blog",
			href: "/blog",
		},
		{
			label: "About",
			href: "/about",
		}
	],
	links: {
		github: "https://github.com/BuddyCodez",
		twitter: "https://twitter.com/getnextui",
		docs: "/",
		discord: "https://discord.gg/9Ab7pzwxjh",
		sponsor: "https://www.patreon.com/UditVegad"
	},
	apiUrl: "https://animeapiastra.vercel.app",
	corsUrl: "https://8e740439-2e97-43a2-b917-306e366c3f31-00-3ui6h19hbh1f8.global.replit.dev/cors?url=",
	geners: [
		"Action",
		"Adventure",
		"Comedy",
		"Drama",
		"Fantasy",
		"Horror",
		"Mecha",
		"Mystery",
		"Psychological",
		"Romance",
		"Sci-Fi",
		"Slice of Life",
		"Sports",
		"Supernatural",
		"Thriller",
	]
};
