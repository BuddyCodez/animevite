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
    const genres = anime?.genres.map((genre: string) => genre + "Watch on AnimeAstra") || [];
    const studios = anime?.studios.map((studio: string) => studio + " Only on AnimeAstra") || [];
    const characters = anime?.characters.map((character: character) => character.name.full + " Only on AnimeAstra") || [];
    return {
        title: parseText(anime?.title) + " | AnimeAstra",
        description: `AnimeAstra: ${anime?.description}`,
        keywords: [
            "watch Anime", 'AnimeAstra', 'animeastra', 'watch all anime for free',
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
        publisher: "AnimeAstra",
        openGraph: {
            images: anime?.image,
            description: `AnimeAstra: ${anime?.description}`,
            title: `Anime: ${parseText(anime?.title)}`,
            url: `https://animeastra.vercel.app/anime/${id}`,
            type: "video.movie",
            tags: [
                "watch Anime", 'AnimeAstra', 'animeastra', 'watch all anime for free',
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

const page = ({ params, searchParams }: Props) => {
    return (
      <AnimeDetails id={params.id} searchParams={searchParams} />
  )
}

export default page