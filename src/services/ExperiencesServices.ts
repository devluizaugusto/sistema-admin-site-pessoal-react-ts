import api from './api';

export interface Experiences{
    id?: number;
    title: string;
    description: string;
    type: string;
    startYear: number | "";
    endYear: number | "";
}

export const createExperiences = async (experiences: Experiences):  Promise<Experiences> => {
    const response = await api.post<Experiences>('/experiences', experiences);
    return response.data;
}

export const getExperiences = async (): Promise<Experiences[]> => {
    const response = await api.get<Experiences[]>('/experiences');
    return response.data;
}

export const getExperiencesById = async (id: number): Promise<Experiences> => {
    const response = await api.get<Experiences>(`/experiences/${id}`);
    return response.data;
}

export const getExperiencesByType = async (type: string): Promise<Experiences[]> => {
    const response = await api.get<Experiences[]>(`/experiences?type=${type}`);
    return response.data;
}

export const updateExperiences = async (experiences:Experiences): Promise<Experiences> => {
    const response = await api.put<Experiences>(`/experiences/${experiences.id}`, experiences);
    return response.data;
}

export const deleteExperiences = async (id: number | undefined): Promise<Experiences> => {
    const response = await api.delete<Experiences>(`/experiences/${id}`);
    return response.data;
}

export const createOrUpdateExperiences = async (experiences: Experiences): Promise<Experiences> => {
    if(!experiences.id){
        return await createExperiences(experiences);
    }
    else{
        return await updateExperiences(experiences);
    }
}