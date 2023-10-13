
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { siteConfig } from '@/config/site';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { CircularProgress } from '@nextui-org/progress';
import { Chip } from '@nextui-org/chip';
import { Card, CardHeader, CardFooter } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { Pagination } from '@nextui-org/pagination';
import { Input } from '@nextui-org/input';
import parseText, { parseAllText, textType } from '@/utils/parseText';
import parse from 'html-react-parser';
import { BsPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import useFetcher from '@/utils/fetcher';

import StarRating from '@/components/StartRating';
import { usePRouter } from '@/lib/usePRouter';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}


interface AnimeType {
    id: String,
    malId: number,
    title: textType,
    status: string,
    image: string,
    cover: string,
    popularity: number,
    description: string,
    rating: number,
    genres: Array<string>,
    color: string,
    totalEpisodes: number,
    currentEpisode: number,
    type: string,
    releaseDate: number
    episodes: Array<Object>,
    studios: Array<string>,
    synonyms: Array<string>,
    duration: number,
    season: string,
    subOrDub: string,
    recommendations: Array<Object>,
    relations: Array<Object>
}

interface Episode {
    number: number;
    id: string;
    title: string;
    image: string;
    airDate: string;

    // Other properties of an episode, adjust accordingly.
}



const AnimeDetails = ({ id, searchParams }: { id: string; searchParams: { [key: string]: string | string[] | undefined } }) => {
    const animeId: any = id;
    const router = usePRouter();
    const { data: anime, isLoading } = useFetcher(siteConfig.apiUrl + "/meta/anilist/info/" + animeId + "?provider=zoro");
    const [episodes, setEpisodes] = useState<Episode[] | null>(null);
    const ref = useRef<HTMLDivElement>(null);


    // console.log(anime);
    const formatter = new Intl.NumberFormat('en', {
        notation: "compact",
        compactDisplay: "short",
    });
    const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    // date Compare like 1 hour ago, few seconds ago..


    useEffect(() => {
        if (!isLoading && anime) {
            const sortedEpisodes = anime?.episodes?.slice(0).sort((a: any, b: any) => a.number - b.number);
            const topEpisodes: any = sortedEpisodes?.slice(0, 15);
            setEpisodes(topEpisodes);
        }
    }, [anime]);
    return (
        <>
            <article>
                <section className="anime-details spad mt-[60px]" style={{
                    background: "var(--rich-black-fogra-29)"
                }}>
                    <div className="container">
                        <div className="anime__details__content">
                            <div className="row">
                                <div className="col-lg-3">
                                    {isLoading ? <Skeleton className="rounded-lg">
                                        <div className="h-24 rounded-lg bg-default-300 anime__details__pic set-bg cursor-pointer"></div>
                                    </Skeleton> :
                                        <Image
                                            className="anime__details__pic set-bg cursor-pointer" src={anime?.image} isZoomed isBlurred shadow='lg' />
                                    }
                                </div>
                                <div className="col-lg-9">
                                    <div className="anime__details__text">
                                        <div className="anime__details__title max-sm:mt-3">
                                            <h3>{
                                                isLoading ? <Skeleton className="h-3 w-3/5 rounded-lg" /> : parseText(anime?.title)
                                            }</h3>
                                            <span>{
                                                isLoading ? <Skeleton className="h-3 w-3/5 rounded-lg" /> : anime?.synonyms?.join(" / ")
                                            }</span>
                                        </div>
                                        <div className="anime__details__rating  hideonphone">
                                            <div className="rating flex">
                                                {isLoading ? <Skeleton className="h-3 w-3/5 rounded-lg" /> : anime?.rating ? <StarRating rating={anime?.rating} /> : 'Not Rated.'}
                                            </div>
                                        </div>
                                        <div className="h-[200px] overflow-y-scroll p-3">
                                            {isLoading ? <Skeleton className=" h-36 w-3/5 rounded-lg" /> : <p> {parse(anime?.description || "")}</p>}
                                        </div>
                                        <div className="anime__details__widget">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    {isLoading ? <Skeleton className="h-3 w-3/5 rounded-lg" /> : <ul>
                                                        <li><span>Type:</span> {anime?.type}</li>
                                                        <li><span>Studios:</span> {anime?.studios?.join(",")}</li>
                                                        <li><span>Date aired:</span> {anime?.releaseDate}</li>
                                                        <li><span>Status:</span> {anime?.status}</li>
                                                        <li><span>Genre:</span> {anime?.genres?.join(", ")}</li>
                                                    </ul>}
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    {isLoading ? <Skeleton className="h-3 w-3/5 rounded-lg" /> : <ul>
                                                        <li><span>Popularity:</span>{formatter.format(anime?.popularity)}</li>
                                                        <li><span>Rating:</span> {anime?.rating / 10} / 10</li>
                                                        <li><span>Duration:</span> {anime?.duration} min/ep</li>
                                                        <li><span>Episodes:</span>{anime?.totalEpisodes || anime?.currentEpisode} Ep</li>
                                                        <li><span>Current: </span>{anime?.currentEpisode} Ep</li>
                                                        <li><span>Season:</span> {anime?.season}</li>

                                                    </ul>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="anime__details__btn">
                                            <Button variant='solid' color='primary' endContent={
                                                <BsPlayFill scale={2} color='black' />
                                            } onPress={() => router.push(`/anime/${anime?.id}/1`)}
                                            >Watch Now</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                <div className="anime__details__review" ref={ref}>
                                    <div className="section-title flex justify-between items-center">
                                        <h5 className='text-3xl bold text-white flex justify-between items-center w-full'>Episodes:
                                            <Input placeholder="Search Episode..." style={{
                                                width: "120px"
                                            }} fullWidth={false}
                                                className="max-w-[220px]"
                                                onChange={(e: any) => {
                                                    const searchTerm = e.target.value.toLowerCase();
                                                    if (!anime || !anime.episodes) {
                                                        setEpisodes(null);
                                                        return;
                                                    }

                                                    if (searchTerm === "") {
                                                        const sortedEpisodes = anime.episodes.slice(0).sort((a: any, b: any) => a.number - b.number);
                                                        const topEpisodes: any = sortedEpisodes.slice(0, 15);
                                                        setEpisodes(topEpisodes);
                                                    } else {
                                                        const FilteredEp: any = anime.episodes.filter((x: any) => x?.title?.toLowerCase()?.includes(searchTerm));
                                                        setEpisodes(
                                                            FilteredEp);
                                                    }
                                                }}
                                            />
                                        </h5>

                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {
                                            isLoading && [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any, index: number) => {
                                                return <Card className=" h-[300px] w-[250px]" isPressable isHoverable key={index}>
                                                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                                        <div className="flex justify-between w-full">
                                                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                                                        </div>
                                                    </CardHeader>
                                                    <Skeleton className="h-[200px] w-full rounded-lg" />
                                                    <CardFooter className="absolute z-10 bottom-0 flex-col" style={{
                                                        backgroundImage: " linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
                                                        width: "100%"
                                                    }}>
                                                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                                                    </CardFooter>
                                                </Card>
                                            })

                                        }
                                        {episodes?.map((item: any, index: number) => {
                                            return <Card className=" h-[300px] w-[250px]" isPressable isHoverable key={item?.id || index}
                                                onPress={() => {
                                                    router.push("/anime/" + anime?.id + "/" + item?.number);
                                                }}
                                            >
                                                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                                    <div className="flex justify-between w-full">
                                                        <Chip color="primary" variant="shadow">{item?.number} Ep</Chip>
                                                        {item?.airDate && <Chip color="default" variant="shadow">
                                                            <i className="fa-solid fa-calendar"></i> &nbsp;
                                                            {shortDateFormatter.format(new Date(item?.airDate))} </Chip>}
                                                    </div>
                                                </CardHeader>
                                                <Image
                                                    removeWrapper
                                                    alt="Card background"
                                                    className="z-0 w-full h-full object-cover"
                                                    src={item?.image}
                                                    isBlurred
                                                    isZoomed
                                                />
                                                <CardFooter className="absolute z-10 bottom-0 flex-col" style={{
                                                    backgroundImage: " linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
                                                    width: "100%"
                                                }}>
                                                    <p className='poppins text-md'>{item?.title}</p>

                                                </CardFooter>
                                            </Card>
                                        })}

                                    </div>
                                    <div className="flex w-full items-center justify-center mt-3">
                                        {anime?.episodes?.length > 15 && <Pagination showControls total={Math.ceil(anime?.episodes.length / 15)}
                                            onChange={(page: any) => {
                                                // console.log("page", page);
                                                let end = (15 * page);
                                                const sortedEpisodes: any = anime?.episodes?.sort((a: any, b: any) => a.number - b.number);
                                                setEpisodes(sortedEpisodes.slice(end - 15, end));
                                                ref?.current && ref?.current.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        // initialPage={1}
                                        />}
                                    </div>
                                    {/* // comments  */}
                                    {/* <div className="row mt-5">
                                            <div className="col-lg-8">
                                                <div className="anime__details__review">
                                                    <div className="section-title my-2">
                                                        <h5>Reviews</h5>
                                                    </div>
                                                    {comments && comments?.map((comment: any) => {
                                                        return <div className="anime__review__item" key={comment._id}>
                                                            <div className="anime__review__item__pic">
                                                                <Image src={comment?.user.image} alt="Comment Image" />
                                                            </div>
                                                            <div className="anime__review__item__text">
                                                                <h6 className='flex gap-2 justify-between items-center flex-wrap'>{comment?.user.name} <div className="flex justify-center items-center gap-2">
                                                                    <span>{comment?.createdAt && formatDistanceToNow(parseISO(comment?.createdAt), { addSuffix: true })}</span>
                                                                    {comment?.user.email == session?.user?.email && <Button isIconOnly
                                                                        variant='light'
                                                                        onClick={() => deleteComment(comment?.message)}
                                                                        endContent={
                                                                            <BsTrash2Fill />
                                                                        } />}
                                                                </div></h6>
                                                                <p>{comment?.message}</p>
                                                            </div>
                                                        </div>
                                                    })}
                                                    {sending && <div className='flex gap-5 w-full h-[100px] justify-center items-center'>
                                                        <div className="dot-pulse"></div>
                                                        <p>Sending Message...</p>
                                                    </div>}
                                                    <div className="anime__details__form">
                                                        <div className="section-title">
                                                            <h5>Your Comment</h5>
                                                        </div>
                                                        <div className="mycomment w-full flex-col gap-2">
                                                            <textarea className=" bg-gray-700 border border-blue-300 rounded p-2 w-full h-40 resize-none focus:outline-none focus:ring focus:border-blue-300" placeholder="Your Comment" id="comment" name="comment" rows={4}
                                                                onChange={(e) => setMessage(e.target.value)}
                                                            />
                                                            <Button endContent={
                                                                <BsSend />
                                                            } color='primary' variant='solid'
                                                                onPress={CreateComment}
                                                            >Send</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div> */}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="anime__details__sidebar product__sidebar">
                                    <div className="section-title">
                                        <h5 className='p-0 w-[120px]'>you might like...</h5>
                                    </div>
                                    <div className="flex flex-col w-full justify-center items-center mt-3 gap-3">

                                        {
                                            isLoading && [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: any, index: number) => {
                                                return <Card className=" h-[300px] w-[250px]" isPressable isHoverable key={index}>
                                                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                                        <div className="flex justify-between w-full">
                                                            <Skeleton className="h-3 w-3/5 rounded-lg" />
                                                        </div>
                                                    </CardHeader>
                                                    <Skeleton className="h-[200px] w-full rounded-lg" />
                                                    <CardFooter className="absolute z-10 bottom-0 flex-col" style={{
                                                        backgroundImage: " linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
                                                        width: "100%"
                                                    }}>
                                                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                                                    </CardFooter>
                                                </Card>
                                            })

                                        }
                                        {!isLoading && anime?.recommendations && anime?.recommendations?.slice(0, 5)?.map((item: any, index: number) => {
                                            return <Card className="h-[300px] w-[250px]" isPressable isHoverable key={item?.id || index}
                                                onPress={() => {
                                                    router.push("/anime/" + item?.id);
                                                }}
                                            >
                                                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                                    <div className="flex justify-between w-full">
                                                        <Chip color="primary" variant="shadow"><div className="flex items-center gap-2 justify-center">
                                                            {item?.rating / 10} <i className="fa-solid fa-star" style={{
                                                                fontSize: "12px"
                                                            }}></i>
                                                        </div> </Chip>
                                                        {item?.status && <Chip color="default" variant="shadow" >
                                                            <span className='flex justify-center items-center gap-2 '>
                                                                <i className="fa-solid fa-circle text-sm" style={{
                                                                    fontSize: "5px"
                                                                }}></i>
                                                                {item?.status}
                                                            </span>
                                                        </Chip>}
                                                    </div>
                                                </CardHeader>
                                                <Image
                                                    removeWrapper
                                                    alt="Card background"
                                                    className="z-0 w-full h-full object-cover"
                                                    src={item?.image}
                                                    isBlurred
                                                    isZoomed
                                                />
                                                <CardFooter className="absolute z-10 bottom-0 flex-col" style={{
                                                    backgroundImage: " linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
                                                    width: "100%"
                                                }}>
                                                    <p className='poppins text-md'>{parseText(item?.title)}</p>

                                                </CardFooter>
                                            </Card>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </>
    )
}


export default AnimeDetails;
export type { AnimeType };
