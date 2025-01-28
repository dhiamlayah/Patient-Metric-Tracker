import axios, { AxiosResponse } from "axios";
import { Patient } from "../CustomInterfaces";
const url: string = import.meta.env.VITE_API_URL + "/patient";


export const getPatients = async () => {
    const response: AxiosResponse<[Patient[],number]> = await axios.get(
      url
    );
    return response.data;
};

export const getPatient = async (id: number): Promise<Patient>  => {
    const response: AxiosResponse<Patient> = await axios.get(
      `${url}/${id}`
    );
    return response.data;
};
