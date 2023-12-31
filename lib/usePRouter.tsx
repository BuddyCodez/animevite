
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import * as NProgress from 'nprogress';
export const usePRouter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { push } = router;


    router.push = (href, options) => {
        NProgress.start();
        push(href, options);
    };
    useEffect(() => {
        NProgress.done();
    }, [pathname, searchParams]);
    return router;
    
};

// add this to a top level component

