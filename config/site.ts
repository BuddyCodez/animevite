export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "AnimeVite",
	description: "Welcome to AnimeVite - your ultimate destination for all things anime! Find the latest news, reviews, and recommendations for your favorite shows, as well as new discoveries. Join our passionate community of anime fans and explore the fascinating world of Japanese animation like never before. Start your journey on AnimeVite today!",
	siteUrl: "https://animevite.vercel.app",
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
	apiUrl: "https://cosumetinstance.vercel.app",
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
