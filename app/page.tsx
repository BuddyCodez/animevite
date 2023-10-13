import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Hero from "@/components/Hero";
import Trending from "@/components/Trending";
import Toprated from "@/components/Toprated";

export default function Home() {
	return (
		<article>
			<Hero />
			<Trending />
			<Toprated />
		</article>
	);
}
