'use client';
import { siteConfig } from '@/config/site';
import useFetcher from '@/utils/fetcher';
import React from 'react'
import { Tooltip } from '@nextui-org/tooltip';
import { useRouter } from 'next/navigation';
import parseText from '@/utils/parseText';
import { Skeleton, Typography } from '@mui/material';
import Link from 'next/link';
import { BsStar } from 'react-icons/bs';
import { TbCalendarStats } from 'react-icons/tb';
import AnimeMiniInfo from './AnimeMiniInfo';
const Toprated = () => {
    const { data: popular, isLoading: popload } = useFetcher(siteConfig.apiUrl + "/meta/anilist/popular?perPage=6");
    const { data: trending, isLoading: trendLoad } = useFetcher(siteConfig.apiUrl + "/meta/anilist/trending?perPage=9");
    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="trending__product">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-8 product__sidebar">
                                        <div className="section-title w-[160px] mb-4">
                                            <h5 className='p-0 w-[120px]'>Trending Animes</h5>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="btn__all">
                                            <Link href="/trending" className="primary-btn">View All <i className="fa-solid fa-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {trendLoad &&
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i: number, _i: number) => {
                                            return <div className='col-lg-4 col-md-6 col-sm-6' key={_i}>
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
                                            </div>
                                        })}

                                    {!trendLoad && trending?.results.map((item: any, index: number) => {
                                        // console.log(item)
                                        return <Link href={'/anime/' + item?.id} className="col-lg-4 col-md-6 col-sm-6" key={item?.id + index}>
                                            <div className="product__item">
                                                <Tooltip
                                                    showArrow
                                                    size="lg"
                                                    placement="right"
                                                    content={
                                                        <AnimeMiniInfo {...item} />
                                                    }

                                                >
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
                                                </Tooltip>
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
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8">
                            <div className="product__sidebar">
                                <div className="product__sidebar__view">
                                    <div className="section-title w-full flex items-center justify-between mb-4">
                                        <h5 className='p-0 w-[120px]'>Popular Animes</h5>
                                        <Link href="/popular" className="primary-btn">View All <i className="fa-solid fa-arrow-right"></i></Link>
                                    </div>
                                    <div className="filter__gallery" id="MixItUp2106D7">
                                        {popload && [1, 2, 3, 4, 5, 6].map((item: number, i: number) => <Skeleton variant="rounded" height="190px" width="100%" sx={{
                                            bgcolor: 'grey.800',
                                        }} animation="wave" className="product__sidebar__view__item set-bg mix day years" key={i}>
                                        </Skeleton>)}
                                        {!popload && popular?.results.map((item: any, index: number) => {
                                            return <Link href={'/anime/' + item?.id} className="product__sidebar__view__item set-bg mix day years" key={item?.id} style={{
                                                backgroundImage: `url(${item?.image})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "top",
                                                backgroundRepeat: "no-repeat"
                                            }}>
                                                <div className="view"><span className='flex items-center gap-1'>
                                                    <TbCalendarStats /> {item?.releaseDate}
                                                </span></div>
                                                <div className="w-full h-[100px] absolute bottom-0 flex items-end" style={{
                                                    backgroundImage: " linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
                                                    width: "100%"
                                                }}>
                                                    <div className="flex gap-2 px-2 items-center">
                                                        <div className="number flex gap-1 items-center">
                                                            <h6 className=' text-theme font-extrabold text-4xl flex items-center'>{index + 1}
                                                                <span className='text-white'>.</span>
                                                            </h6>

                                                        </div>
                                                        <Typography variant='h6' >{parseText(item?.title)}</Typography>
                                                    </div>
                                                </div>
                                            </Link>
                                        })}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Toprated

