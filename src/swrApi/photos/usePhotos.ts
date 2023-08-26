import useSWR from 'swr';
import { usePathname, useSearchParams } from 'next/navigation';
import photoApi from './photos';

const usePhotos = () => {
    const searchParams = useSearchParams().toString();
    const path = usePathname();

    const { data, ...rest } = useSWR(
        path.includes('photos') ? `?${searchParams}` : null,
        photoApi.getPhotos,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    return {
        photos: data as Photos[],
        ...rest
    };
};

export default usePhotos;
