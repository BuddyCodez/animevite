"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import * as NProgress from 'nprogress';
export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;

}

export function Providers({ children, themeProps }: ProvidersProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useEffect(() => {
		NProgress.done();
	}, [pathname, searchParams])
	return (
			<NextUIProvider>
				<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
			</NextUIProvider>
	);
}
