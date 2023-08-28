import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import photoApi from './photos';

const usePhotos = () => {
    const searchParams = useSearchParams().toString();

    const { data, ...rest } = useSWR(`?${searchParams}`, photoApi.getPhotos);

    return {
        photos: data as Photos[],
        ...rest
    };
};

export default usePhotos;
