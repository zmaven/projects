import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

const endpoint = '/projects';

const getProjects = async (query: string) => {
    const response = await api.get(`${endpoint}${query}`);
    return response.data;
};

const projectApi = {
    endpoint,
    getProjects
};

export default projectApi;
