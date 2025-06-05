import axios from "axios";
import { SearchExternalQueue, Queue } from "@/types";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({baseURL: API_BASE_URL})

export const getQueue = async (): Promise<Queue> => {
    try {
        const response = await api.get('/queue/disconnected');
        sessionStorage.setItem('queueResults', JSON.stringify(response.data));    
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar filas:', error);
        throw error;
    }
};

export const searchQueues = async (data: SearchExternalQueue): Promise<Queue[]> => {
    try {
        const response = await api.post('/queue/search/externalQueue', data);
        return response.data;
    } catch (error) {
        console.error('Erro na busca de filas:', error);
        throw error;
    }
};

export const  connectQueueRequest = async (id: number,data: Partial<Queue>): Promise<Queue> => {
    try {
        const response = await api.patch(`/queue/disconnected/${id}`,data)
        return response.data
    } catch (error) {
        console.error('Erro na atualização de filas:', error);
        throw error;
    }
}


export const removeQueueRequest = async (id: number): Promise<void> => {
    try {
        await api.delete(`/queue/disconnected/${id}`);
    } catch (error) {
        console.error('Erro ao remover fila:', error);
        throw error; 
    }
};