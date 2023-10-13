"use server";
import { siteConfig } from "@/config/site";
async function FetchEpisode(epId: string) {
    const res = await fetch(siteConfig.apiUrl + "/meta/anilist/watch/" + epId, { cache: "force-cache" })
    const data = await res.json()
    return { episode: data, epLoading: false };
}
export default FetchEpisode;