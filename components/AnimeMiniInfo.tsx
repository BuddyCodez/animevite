'use client';
import { siteConfig } from '@/config/site'
import useFetcher from '@/utils/fetcher'
import React from 'react'
import { Loader } from './Trending';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { CircularProgress } from '@nextui-org/progress';
import parseText, { textType } from '@/utils/parseText';
import { BsStar } from 'react-icons/bs';
import parse from 'html-react-parser';
import { GrAdd } from 'react-icons/gr';
import { MdAdd } from 'react-icons/md';
const AnimeMiniInfo = ({ id, title, image, rating, description, genres }: { id: string, title: textType, image: string, rating: number, description: string, genres: Array<string> }) => {
    return (
        <>
            <div className="h-[250px] w-[250px]">
                {!id && <div className='w-[100%] h-[100%] flex justify-center items-center'>
                   <p>Unable to get info!</p>
                </div>}
                <div className='w-[100%] h-[100%] flex flex-col py-2'>
                    <div className="flex justify-between w-full">
                        <Image src={image} width={70} height={70}
                        />
                        <div className="flex flex-col gap-0 w-full m-1">
                            <span className='small'>Anime Name:</span>
                            <span className='small'>{parseText(title)?.length > 16 ? parseText(title).slice(0, 16) + "..." : parseText(title)}</span>
                            <span className='flex justify-between'>
                                <span className='small'>Rating:</span>
                                <span className='small flex gap-1 items-center'>{rating / 10}
                                    <BsStar />
                                </span>
                            </span>
                        </div>
                    </div>
                    <p className='h-[70px] overflow-y-scroll scrollbar-hide mt-1'>
                        {description?.length > 200 ? parse(description.slice(0, 200) + "...") : parse(description)}
                    </p>
                    <div className="product__item__text">
                        <ul className='flex gap-1'>
                            {genres && genres.slice(0, 3).map((genre: any, index: number) => (
                                <li key={index}>{genre}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <h6>Add to watchlist</h6>
                        <Button isIconOnly color="primary" variant='ghost' radius='full' className='text-white'>
                            <MdAdd className='text-white' style={{ color: "white" }} />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnimeMiniInfo