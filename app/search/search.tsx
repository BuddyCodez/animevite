"use client";
import { siteConfig } from '@/config/site'
import useFetcher from '@/utils/fetcher'
import React, { useState, useEffect } from 'react'
import { Skeleton, Typography } from '@mui/material';
import { CircularProgress } from "@nextui-org/progress";
import parseText from '@/utils/parseText';
import { BsStar } from 'react-icons/bs';
import { TbCalendarStats } from 'react-icons/tb';
import Link from 'next/link';
import SearchError from './SearchError';
const Search = ({ keyword }: { keyword: string }) => {
    const { data, isLoading, error }: { data: searchResultType; isLoading: boolean; error: string; } = useFetcher(siteConfig.apiUrl + "/meta/anilist/" + keyword);
    const [searchResults, setSearchResults] = useState<searchResultType | null>(null);
    if (error || !keyword || keyword === "") return <div>
        <SearchError />
    </div>
    useEffect(() => {
        if (!isLoading) {
            setSearchResults(data);
        }
        return () => {

        }
    }, [isLoading])
    useEffect(() => {
        const handleScroll = async () => {
            // Replace 'myDiv' with the ID or class of the element you want to check
            const myDiv = document.getElementById('searchDiv');
            if (!myDiv) return;
            const rect = myDiv.getBoundingClientRect();
            const isScrolledToDiv = rect.bottom <= window.innerHeight;
            if (isScrolledToDiv) {
                let page = searchResults?.currentPage || 0;
                let hasNextPage = searchResults?.hasNextPage || false;
                if (!hasNextPage || page == 0) return;
                console.log("Fetching New Page");
                const data = await fetch(siteConfig.apiUrl + "/meta/anilist/" + keyword + "page?=" + (page + 1)).then(res => res.json());
                if (searchResults?.results.includes(data.results)) return;
                let newData = {
                    hasNextPage: data.hasNextPage,
                    results: [...searchResults?.results || [], ...data.results],
                    currentPage: data.currentPage
                }
                setSearchResults(newData)
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);
    return (
        <article className='py-12 mt-3 px-4'>
            <div className="flex flex-col justify-center items-center">
                <Typography variant='h5'>Search results for {keyword}</Typography>
                {!isLoading ? <small>found {data?.results.length} results</small> : <div className='flex justify-center items-center gap-2'>
                    <div className="plusing"></div> <small>Finding search results...</small>
                </div>}
            </div>
            <div className="flex justify-center items-center flex-wrap p-3" id='searchDiv'>
                {!isLoading && searchResults?.results?.map((item: any, index: number) => {
                    return <Link href={'/anime/' + item?.id} className="col-lg-4 col-md-6 col-sm-6" key={item?.id}>
                        <div className="product__item">
                            <div className="product__item__pic set-bg" style={{
                                backgroundImage: `url(${item?.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}>
                                <div className="ep">{item?.totalEpisodes} Ep</div>
                                <div className="comment"><span className='flex items-center gap-1'><BsStar /> {item?.rating / 10}</span></div>
                                <div className="view">
                                    <span className='flex items-center gap-1'>
                                        <TbCalendarStats /> {item?.releaseDate}
                                    </span>
                                </div>
                            </div>
                            <div className="product__item__text">
                                <ul className='flex gap-1'>
                                    {item?.genres && item?.genres.slice(0, 3).map((genre: any, index: number) => (
                                        <li key={index}>{genre}</li>
                                    ))}
                                </ul>
                                <h5>{parseText(item?.title)}</h5>
                            </div>

                        </div>
                    </Link>
                })}
            </div>
            {isLoading && <div className="flex justify-center items-center flex-wrap p-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item: number, index: number) => <div className='col-lg-4 col-md-6 col-sm-6' key={index}>
                    <div className="product__item">
                        <Skeleton className="product__item__pic set-bg" variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: "5px" }} animation="wave"
                            height="325px" width="100%"
                        >
                            <div className="ep">
                                <Skeleton variant="text"
                                    height={100}
                                    width="100%" sx={{
                                        bgcolor: '#0b85ff',
                                        borderRadius: "5px"
                                    }} animation="wave" />

                            </div>
                            <div className="comment"><span className='flex items-center gap-1'><BsStar /> Loading...</span></div>
                            <div className="view">
                                <span className='flex items-center gap-1'>
                                    <TbCalendarStats /> Loading...
                                </span>
                            </div>
                        </Skeleton>
                        <div className="product__item__text">
                            <ul className='flex gap-1'>
                                {[1, 2, 3].map((item: number, i: number) => <Skeleton key={i}
                                    width={100} height={30}
                                    variant="rounded" sx={{ bgcolor: 'grey.800', borderRadius: "12px" }} animation="wave"></Skeleton>)}
                            </ul>
                            <h5>
                                <Skeleton variant="text" height={25} width="100%" sx={{
                                    bgcolor: 'grey.800',
                                }} animation="wave" />
                            </h5>
                        </div>
                    </div>
                </div>)}
            </div>}
        </article>
    )
}

export default Search