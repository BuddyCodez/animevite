"use client";
import { siteConfig } from '@/config/site';
import useFetcher from '@/utils/fetcher';
import React, { useEffect, useRef, useState } from 'react'
import parseText from '@/utils/parseText';
import { Skeleton } from '@mui/material';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import { SearchIcon } from '@/components/icons';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Track, type MediaPlayerInstance } from '@vidstack/react';
import {
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { CheckboxGroup, ScrollShadow } from '@nextui-org/react';
import { CustomCheckbox } from '@/components/customCheckBox';
import Link from 'next/link';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Error from "@/components/Error";
interface Source {
    url: string;
    isM3U8: boolean;
    quality: string;
}
interface subtitleType {
    url: string;
    lang: string;
}
interface EPData {
    headers: {
        Referer: string;
    };
    sources: Source[];
    download: string;
    subtitles: subtitleType[];
}
let bgStyle = {
    backgroundColor: "var(--rich-black-fogra-29)"
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Watch = ({ animeId, epNumber }: { animeId: string; epNumber: string }) => {
    const [searchEnabled, setSearchEnabled] = useState(false);
    const [episodeData, setEpData] = useState<EPData | null>(null);
    const [alignment, setAlignment] = useState('sub');
    const [modes, setModes] = useState(['skip', 'auto']) as any;
    const [open, setOpen] = useState(false);
    const [episodes, setEpisode] = useState<Array<Object> | null | undefined>(undefined);
    const vPlayer = useRef<MediaPlayerInstance>(null);
    const { data: anime, isLoading: animeLoading } = useFetcher(siteConfig.apiUrl + "/meta/anilist/info/" + animeId + "?provider=zoro");
    let zoroEpId = anime?.episodes[parseInt(epNumber) - 1].id;
    // console.log(epId, anime?.episodes)
    const { data: epData, isLoading: epLoading } = useFetcher(siteConfig.apiUrl + `/anime/zoro/watch?episodeId=${zoroEpId}&server=vidcloud`) as { data: EPData, isLoading: boolean };
    // console.log(epData);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    useEffect(() => {
        let epLen = anime?.episodes?.length;
        if (epLen > 0) {
            setEpisode(anime?.episodes);
        }
        if (epData?.sources?.length > 0 && !episodeData?.sources) {
            setEpData(epData);
        }
    }, [anime, epData]);
    let isLoading = animeLoading || epLoading;
    if (!isLoading && (!anime || !epData)) {
        return <Error />
    }
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                message="Dub is not available for this episode."
            />
            <section className='anime-details spad' style={{
                height: "100%"
            }}>
                <div className='h-screen w-full' style={{
                    backgroundImage: `url("${anime?.cover}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    position: "fixed",
                    // width: "100%",
                    height: "100%"
                }}>
                    <div className="bg-blur"></div>
                </div>
                <div className="container mx-auto p-4" >
                    <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
                        <div className="col-span-1 md:col-span-1 h-[800px] rounded-lg shadow-md p-4 " style={bgStyle}>
                            <div className="flex items-center justify-center mb-3">
                                <h1>Currently Watching: {parseText(anime?.title)}</h1>
                            </div>
                            <div className="wrapper">
                                {(isLoading && !episodeData?.sources) && <Skeleton className="h-[200px] w-full rounded-lg"
                                    variant="rounded" sx={{ bgcolor: 'grey.800' }} animation="wave" height="200px" width="100%"
                                />}
                                {(!isLoading && episodeData?.sources?.find(source => source?.quality === "auto")?.url) &&

                                    <MediaPlayer title={parseText(anime?.title)} src={
                                        "https://cors.uditvegad.repl.co/cors?url=" + episodeData.sources.find(source => source.quality === "auto")?.url || undefined
                                    }
                                        // poster={"https://cors.uditvegad.repl.co/cors?url=" + anime?.cover}
                                        crossorigin="anonymous"
                                        // aspectRatio='16:9'
                                        ref={vPlayer}
                                    >
                                        <MediaProvider>
                                            {!isLoading && episodeData?.subtitles?.map((s: subtitleType, index: number) => {
                                                if (s.lang == "Thumbnails") return;
                                                return <Track
                                                    kind='subtitles'
                                                    key={String(index)}
                                                    src={"https://cors.uditvegad.repl.co/cors?url=" + s.url}
                                                    label={s.lang}
                                                    lang={s.lang}
                                                    default={s.lang == "English" ? true : false}
                                                />
                                            })}
                                        </MediaProvider>
                                        <DefaultVideoLayout icons={defaultLayoutIcons}
                                            thumbnails={
                                                episodeData?.subtitles?.find((s: subtitleType) => s.lang == "Thumbnails")?.url
                                                    ? "https://cors.uditvegad.repl.co/cors?url=" + episodeData?.subtitles?.find((s: subtitleType) => s.lang == "Thumbnails")?.url
                                                    : undefined

                                            }
                                        />
                                    </MediaPlayer>
                                }

                            </div>
                            <div className="flex justify-between items-center flex-wrap gap-3 mt-3 px-4">
                                <ToggleButtonGroup
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={(event, newAlignment) => {
                                        setAlignment(newAlignment);
                                        if (newAlignment === "dub") {
                                            const epid = String(zoroEpId).replace("$sub", "$dub")
                                            fetch(siteConfig.apiUrl + `/anime/zoro/watch?episodeId=${epid}&server=vidcloud`).then((res) => res.json()).then((data) => {
                                                if (data?.message) return handleClick();
                                                setEpData(data);
                                            });
                                        } else {
                                            setEpData(epData);
                                        }
                                    }
                                    }
                                    aria-label="Video Mode"
                                    sx={{
                                        bgcolor: 'grey.900',

                                    }}
                                    disabled={(isLoading || animeLoading || epLoading) ? true : false}
                                >
                                    <ToggleButton value="sub"><h2 className={`${alignment === "sub" ? 'text-primary' : 'text-white'}`}>Watch Sub
                                    </h2></ToggleButton>
                                    <ToggleButton value="dub"><h2 className={`${alignment === "dub" ? 'text-primary' : 'text-white'}`}>
                                        Watch Dub
                                    </h2></ToggleButton>
                                </ToggleButtonGroup>

                            </div>
                            <div className="flex justify-between items-center flex-wrap gap-3 mt-1 px-4">
                                <CheckboxGroup
                                    className="gap-1"
                                    label="Select Modes:"
                                    orientation="horizontal"
                                    value={modes}
                                    onChange={setModes}
                                >
                                    <CustomCheckbox value="auto"><small className='poppins'>AutoPlay(nextEP)</small></CustomCheckbox>
                                    <CustomCheckbox value="skip"><small className='poppins'>Skip(Intro)</small></CustomCheckbox>
                                </CheckboxGroup>
                            </div>
                            <div className="flex justify-center items-center flex-wrap gap-2 mt-1">

                            </div>
                        </div>


                        <div className="col-span-1 rounded-lg h-[800px] shadow-md p-4 mb-3" style={bgStyle}>
                            <div className="flex items-center justify-between w-[100%] mb-4">
                                {!searchEnabled && <>
                                    <h3 className="text-lg font-semibold">Episode List</h3>
                                    <Button variant="ghost" color="primary" isIconOnly radius='full' onClick={
                                        () => {
                                            setSearchEnabled(!searchEnabled);
                                        }
                                    }>
                                        <SearchIcon scale={1.5} />
                                    </Button></>}
                                {searchEnabled && <>
                                    <Input
                                        isClearable

                                        onClear={() => {
                                            setEpisode(anime?.episodes);
                                            setSearchEnabled(false);
                                        }}
                                        placeholder="Search Episode"
                                        onKeyPress={(e: any) => {
                                            if (e?.key == "Enter") {
                                                const query = e?.target?.value;
                                                if (!query || query == "") return setEpisode(anime?.episodes);
                                                const filteredEpisodes = episodes?.filter((x: any) => x?.title?.toLowerCase().includes(query?.toLowerCase())
                                                    || x?.number?.toString().includes(query?.toLowerCase())
                                                );
                                                setEpisode(filteredEpisodes);
                                            }
                                        }}
                                    />
                                </>}
                            </div>
                            <ScrollShadow className="wrapper h-[93%] overflow-y-scroll flex flex-col p-1 scrollbar-hide">
                                {animeLoading && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item: number, index: number) => {
                                    return <Skeleton className="border-gray-400 flex flex-row mb-2" key={index} variant='rounded'
                                        height="70px" width="100%" animation="wave" sx={{ bgcolor: 'grey.800' }}
                                    />
                                })}
                                {!animeLoading && episodes?.map((ep: any, index: number) => (
                                    <Link href={`/anime/${anime?.id}/${ep?.number}`} className="border-gray-400 flex flex-row mb-2" key={ep?.id}>
                                        <div className={`select-none cursor-pointer ${(index + 1).toString() == epNumber ? "bg-gray-900" : "bg-slate-800"} rounded-md flex flex-1 items-center p-3  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg`}>
                                            <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                                                <Image src={ep?.image} alt="Episode Image" className="w-10 h-10 object-cover rounded-md" />
                                            </div>
                                            <div className="flex-1 pl-1">
                                                <div className="font-medium">{ep?.title}</div>
                                                <div className="text-gray-600 text-sm">{ep?.number} Episode</div>
                                            </div>

                                        </div>
                                    </Link>
                                ))}

                            </ScrollShadow>
                        </div>
                        <div className="col-span-1 rounded-lg h-[800px] shadow-md p-4" style={bgStyle}>
                            <h3 className="text-lg font-semibold mb-2">Related Anime</h3>
                            <div className="flex flex-col">
                                {anime?.relations && anime?.relations.slice(0, 7).map((item: any) => {
                                    return <div className="flex mb-2" key={item?.id}>
                                        <Image src={item?.image} alt="Related Anime" className="w-16 h-16 object-cover rounded-lg" />
                                        <div className="ml-4">
                                            <small className="font-semibold">{parseText(item?.title)}</small>
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <p className="text-gray-500">Rating:{item?.rating / 10}</p>
                                                    <p className="text-gray-500">Relation:<br />{item?.relationType}</p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-gray-500">Type:{item?.type}</p>
                                                    <p className="text-gray-500">Status:<br />{item?.status}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Watch
async function fetchDub(aniId: string, epNumber: string) {
    try {
        const res = await fetch(siteConfig.apiUrl + "/meta/anilist/info/" + aniId + "?dub=true");
        const data = await res.json();
        const dubEp = data?.episodes?.find((ep: any) => ep?.number == epNumber);
        if (!dubEp || !data) {
            console.warn("No dub episode.")
            return {
                message: "No Dub Episode Found"
            }
        }
        console.log(`${dubEp?.title}| found ${dubEp?.id}  episode for animeid ${data?.id}`);
        const epres = await fetch(siteConfig.apiUrl + "/meta/anilist/watch/" + dubEp.id);
        const epdata = await epres.json();
        console.log(epdata);
        return epdata;
    } catch (error) {
        console.log(error);
        return {
            message: "No Dub Episode Found"
        }
    }
}