import useSWR from 'swr';
import projectApi from './projects';

const useProjects = (params: string) => {
    const { data, ...rest } = useSWR(`?${params}`, projectApi.getProjects);

    return {
        projects: data as Project[],
        ...rest
    };
};

export default useProjects;
