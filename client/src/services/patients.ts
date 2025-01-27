import axios, { AxiosResponse } from "axios";
import { Patient } from "../CustomInterfaces";


export const getPatients = async () => {
    const response: AxiosResponse<[Patient[],number]> = await axios.get(
      "http://localhost:3000/patient"
    );
    return response.data;
};

export const getPatient = async (id: string): Promise<Patient>  => {
    const response: AxiosResponse<Patient> = await axios.get(
      `http://localhost:3000/patient/${id}`
    );
    return response.data;
};
