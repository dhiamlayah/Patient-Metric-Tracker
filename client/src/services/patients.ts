import axios, { AxiosResponse } from "axios";
import { Patient } from "../CustomInterfaces";


export const getPatients = async () => {
  try {
    const response: AxiosResponse<[Patient[],number]> = await axios.get(
      "http://localhost:3000/patient"
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("Error:", err);
  }
};

export const getPatient = async (id: string): Promise<Patient>  => {
    const response: AxiosResponse<Patient> = await axios.get(
      `http://localhost:3000/patient/${id}`
    );
    return response.data;
};
