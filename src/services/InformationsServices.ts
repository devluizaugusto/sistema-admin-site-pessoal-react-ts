import api from './api';

export interface Informations{
    id?: number;
    photo: string;
    name: string;
    office: string;
    summary: string;
}

export const createInformations = async (informations: Informations): Promise<Informations> => {
    const response = await api.post<Informations>('/informations', informations);
    return response.data;
}

export const getInformations = async (): Promise<Informations> => {
    const response = await api.get<Informations>('/informations/1');
    return response.data;
}

export const updateInformations = async (informations: Informations): Promise<Informations> => {
    const response = await api.put<Informations>('/informations/1', informations);
    return response.data;
}


export const deleteInformations = async (): Promise<Informations> => {
    const response = await api.delete<Informations>('/informations/1');
    return response.data;
}

export const createOrUpdateInformations = async (informations: Informations): Promise<Informations> => {
    if (!informations.id) {
        return await createInformations(informations);
    } else {
        return await updateInformations(informations);
    }
}
