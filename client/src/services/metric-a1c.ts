import axios, { AxiosResponse } from "axios";
import { AvgMetricA1c, PatientMetricA1c } from "../CustomInterfaces";

export const createMetricA1c = async (
  patientMetricA1c: PatientMetricA1c
): Promise<PatientMetricA1c> => {
  const response: AxiosResponse<PatientMetricA1c> = await axios.post(
    "http://localhost:3000/metric-a1c",
    patientMetricA1c
  );
  return response.data;
};



export const getAvrageOfA1cByMonths = async (
  id: number 
): Promise<AvgMetricA1c[]> => {
  const response: AxiosResponse<AvgMetricA1c[]> = await axios.get(
    `http://localhost:3000/metric-a1c/${id}/avg`
  );
  return response.data;
};

export const getAllPatientA1c = async (
  id: number , skip ?:number
): Promise<[PatientMetricA1c[],number]> => {
  const response: AxiosResponse<[PatientMetricA1c[],number]> = await axios.get(
    `http://localhost:3000/metric-a1c/${id}`,{
        params: {
          skip: skip || 0, 
        },
    }
  );
  return response.data;
};
