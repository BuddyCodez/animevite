import useSWR from 'swr';
const fetcher = (...args: any) => fetch(args, {
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    cache: "force-cache"
}).then((res) => res.json());
export default function useFetcher(url: string, alternateFetcher?: any | undefined) {
    try {
        const { data, error } = useSWR(url, fetcher);
        if (error) {
            alternateFetcher && alternateFetcher(url);
        }
        // console.log("Fetcher Used for", url);
        const isLoading = !data && !error;
        return {
            isLoading: isLoading,
            data: data,
            error: error
        }
    } catch (e: any) {
        console.error(e.toString());
        return {
            data: undefined,
            isLoading: false,
            error: e.toString()
        }
    }
}