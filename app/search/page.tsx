'use client'
import React from 'react'
import type { Props } from '@/types/props'
import Search from './search'
import { useSearchParams } from 'next/navigation'
import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

const page = () => {
    const searchParams = useSearchParams();

    const searchQuery = searchParams.get('keyword');
    // console.log(searchQuery)
    return (
        <Search keyword={searchQuery as string} />
        // <h1>sad</h1>
    )
}

export default page