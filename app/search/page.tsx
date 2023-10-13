'use client'
import React from 'react'
import type { Props } from '@/types/props'
import Search from './search'
import { useSearchParams } from 'next/navigation'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
export const metadata: Metadata = {
    title: "AnimeVite Search",
    description: "Explore a vast world of anime with Anime Vite's powerful search engine. Find your favorite anime series, movies, and characters instantly. Discover new adventures, genres, and hidden gems in the world of Japanese animation.",
    keywords: [
        "Anime",
        "Japanese Animation",
        "Anime Search",
        "Anime Series",
        "Anime Movies",
        "Anime Characters",
        "Anime Database",
        "Anime Recommendations",
        "Otaku",
        "Animation Enthusiast"
    ],
    openGraph: {
        title: "Anime Vite - Your Anime Search Destination",
        description: "Discover and search for your favorite anime series, movies, and characters on Anime Vite. Explore the world of Japanese animation like never before.",
        url: siteConfig.siteUrl,
        type: "website"

    }
}
const rotue = () => {
    const searchParams = useSearchParams();

    const searchQuery = searchParams.get('keyword');
    // console.log(searchQuery)
    return (
        <Search keyword={searchQuery as string} />
        // <h1>sad</h1>
    )
}

export default rotue