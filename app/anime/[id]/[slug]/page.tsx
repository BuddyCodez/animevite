// "use client"
import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import { siteConfig } from '@/config/site'
import parseText from '@/utils/parseText'
import type { Props } from '@/types/props'
import { useParams } from 'next/navigation'
import Watch from './watch'
type character = {
    id: number,
    name: {
        full: string
    }
}

export const metadata: Metadata = {
    title: "Watch Anime",
};
const page = ({ params }: { params: { slug: string; id: string; } }) => {
    const animeId = params.id;
    const episode = params.slug;
    // console.log(animeId, episode)
    return (
        <>
            <Watch animeId={animeId} epNumber={episode} />
        </>
    )
}

export default page