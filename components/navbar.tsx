'use client';
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import {Image} from "@nextui-org/image";
import {
	GithubIcon,
	DiscordIcon,
	SearchIcon,
} from "@/components/icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { Logo } from "@/components/icons";
import { useRouter } from "next/navigation";
import NextTopLoader from 'nextjs-toploader';
import { usePRouter } from "@/lib/usePRouter";

export const Navbar = () => {
	const { data: session } = useSession();

	const router = usePRouter();
	const searchInput = (
		<Input
			aria-label="Search Anime..."
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			onKeyDown={(e: any) => {
				//enter key
				if (e.key === "Enter") {
					router.push(`/search?keyword=${e.currentTarget.value}`);
				}
			}}
			endContent={
				<div className="outerwrap flicker ">
					<Image src="/assets/lufffy.png"
						sizes="2xl"
						alt="Luffy"
						style={{
							transform: "scale(1.3)",
						}}
					/>
				</div>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<>

			<NextUINavbar className="fixed" maxWidth="xl" position="sticky">
				<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
					<NavbarBrand className="gap-3 max-w-fit">
						<NextLink className="flex justify-start items-center gap-1" href="/">
							<Logo />
							<p className="font-bold text-inherit">
								{siteConfig.name}
							</p>
						</NextLink>
					</NavbarBrand>
					<div className="hidden lg:flex gap-4 justify-start ml-2">
						{siteConfig.navItems.map((item) => (
							<NavbarItem key={item.href}>
								<NextLink
									className={clsx(
										linkStyles({ color: "foreground" }),
										"data-[active=true]:text-primary data-[active=true]:font-medium"
									)}
									color="foreground"
									href={item.href}
								>
									{item.label}
								</NextLink>
							</NavbarItem>
						))}
					</div>

				</NavbarContent>

				<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
					<NavbarItem className="hidden sm:flex gap-2">
						<Link isExternal href={siteConfig.links.discord}>
							<DiscordIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.github}>
							<GithubIcon className="text-default-500" />
						</Link>

					</NavbarItem>
					<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
					<NavbarItem>
						{session ? <Dropdown placement="bottom-start">
							<DropdownTrigger>
								<User
									as="button"
									avatarProps={{
										isBordered: true,
										src: session?.user?.image || "",
									}}
									className="transition-transform"
									description={session?.user?.email}
									name={session.user?.name}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label="User Actions" variant="flat">
								<DropdownItem key="profile" className="h-14 gap-2">
									<p className="font-bold">Signed in as</p>
									<p className="font-bold">@{session?.user?.name}</p>
								</DropdownItem>
								<DropdownItem key="settings" onClick={() => router.push("/watchlist")}>
									My WatchList
								</DropdownItem>
								<DropdownItem key="logout" color="danger" onClick={() => signOut()}>
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown> : <Button color="primary" variant="shadow" endContent={
							<DiscordIcon />
						}
							onClick={() =>
								signIn("discord")
							}
						>
							Login
						</Button>}
					</NavbarItem>
				</NavbarContent>

				<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
					<Link isExternal href={siteConfig.links.github}>
						<GithubIcon className="text-default-500" />
					</Link>
					<NavbarMenuToggle />
				</NavbarContent>

				<NavbarMenu>

					{searchInput}
					<div className="mx-4 mt-2 flex flex-col gap-2">
						{siteConfig.navMenuItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color={
										index === 2
											? "primary"
											: index === siteConfig.navMenuItems.length - 1
												? "danger"
												: "foreground"
									}
									href="#"
									size="lg"
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						))}
						<NavbarMenuItem className="w-full">
							<Button color="primary" className="w-full" variant="shadow" endContent={
								<DiscordIcon />
							}>
								Login
							</Button>
						</NavbarMenuItem>
					</div>
				</NavbarMenu>
			</NextUINavbar>
			<NextTopLoader
				color="#0b85ff"
				initialPosition={0.08}
				crawlSpeed={200}
				height={3}
				crawl={true}
				showSpinner={true}
				easing="ease"
				speed={200}
				shadow="0 0 10px ##0b85ff,0 0 5px ##0b85ff"
			/>
		</>
	);
};
