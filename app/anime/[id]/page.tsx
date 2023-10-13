import React from 'react'
import AnimeDetails from './anime'
import { Metadata, ResolvingMetadata } from 'next'
import { siteConfig } from '@/config/site'
import parseText from '@/utils/parseText'
import type { Props } from '@/types/props'
type character = {
    id: number,
    name: {
        full: string
    }
}
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id

    // fetch data
    const anime = await fetch(siteConfig.apiUrl + "/meta/anilist/info/" + id).then((res) => res.json())
    const genres = anime?.genres.map((genre: string) => genre + "Watch on AnimeVite") || [];
    const studios = anime?.studios.map((studio: string) => studio + " Only on AnimeVite") || [];
    const characters = anime?.characters.map((character: character) => character.name.full + " Only on AnimeVite") || [];
    return {
        title: parseText(anime?.title) + " | AnimeVite",
        description: `AnimeVite: ${anime?.description}`,
        keywords: [
            "watch Anime", 'AnimeVite', 'animevite', 'watch all anime for free',
            parseText(anime?.title), parseText(anime?.title) + " anime", parseText(anime?.title) + " anime online",
            parseText(anime?.title) + " anime online for free", parseText(anime?.title) + " anime online for free in hd",
            parseText(anime?.title) + " anime online for free in hd quality", parseText(anime?.title) + " anime online for free in hd quality watch",
            parseText(anime?.title) + " anime online for free in hd quality watch all episodes",
            parseText(anime?.title) + " anime online for free in hd quality watch all episodes online",
            parseText(anime?.title) + " anime online for free in hd quality watch all episodes online for free",
            ...genres,
            ...studios,
            ...characters
        ],
        publisher: "AnimeVite",
        openGraph: {
            images: anime?.image,
            description: `AnimeVite: ${anime?.description}`,
            title: `Anime: ${parseText(anime?.title)}`,
            url: `https://animevite.vercel.app/anime/${id}`,
            type: "video.movie",
            tags: [
                "watch Anime", 'AnimeVite', 'animevite', 'watch all anime for free',
                parseText(anime?.title), parseText(anime?.title) + " anime", parseText(anime?.title) + " anime online",
                parseText(anime?.title) + " anime online for free", parseText(anime?.title) + " anime online for free in hd",
                parseText(anime?.title) + " anime online for free in hd quality", parseText(anime?.title) + " anime online for free in hd quality watch",
                parseText(anime?.title) + " anime online for free in hd quality watch all episodes",
                parseText(anime?.title) + " anime online for free in hd quality watch all episodes online",
                parseText(anime?.title) + " anime online for free in hd quality watch all episodes online for free",
                ...genres,
                ...studios,
                ...characters
            ]
        },
    }
}
export const metadata: Metadata = {
    title: "Anime Info",
};
const page = ({ params, searchParams }: Props) => {
    return (
      <AnimeDetails id={params.id} searchParams={searchParams} />
  )
}

export default page