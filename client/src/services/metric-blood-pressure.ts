import axios, { AxiosResponse } from "axios";
import { AvgMetricBloodPressure, PatientMetricBloodPressure } from "../CustomInterfaces";
const url: string = import.meta.env.VITE_API_URL + "/metric-blood-pressure";

export const createMetricBloodPressure = async (
  patientMetricBloodPressur: PatientMetricBloodPressure
): Promise<PatientMetricBloodPressure> => {
    const response: AxiosResponse<PatientMetricBloodPressure> =
      await axios.post(
        url,
        patientMetricBloodPressur
      );
    return response.data
};

export const getAvrageOfBloodPressureByMonths = async (
  id: number 
): Promise<AvgMetricBloodPressure[]> => {
  const response: AxiosResponse<AvgMetricBloodPressure[]> = await axios.get(
    `${url}/${id}/avg`
  );
  return response.data;
};


export const getAllPatientBloodPressure = async (
  id: number , skip ?:number
): Promise<[PatientMetricBloodPressure[],number]> => {
  const response: AxiosResponse<[PatientMetricBloodPressure[],number]> = await axios.get(
    `${url}/${id}`,{
      params: {
        skip: skip || 0, 
      },
  }
  );
  return response.data;
};
