import axios, { AxiosResponse } from "axios";
import { AvgMetricBloodPressure, PatientMetricBloodPressure } from "../CustomInterfaces";

export const createMetricBloodPressure = async (
  patientMetricBloodPressur: PatientMetricBloodPressure
): Promise<PatientMetricBloodPressure> => {
    const response: AxiosResponse<PatientMetricBloodPressure> =
      await axios.post(
        "http://localhost:3000/metric-blood-pressure",
        patientMetricBloodPressur
      );
    return response.data
};

export const getAvrageOfBloodPressureByMonths = async (
  id: number 
): Promise<AvgMetricBloodPressure[]> => {
  const response: AxiosResponse<AvgMetricBloodPressure[]> = await axios.get(
    `http://localhost:3000/metric-blood-pressure/${id}/avg`
  );
  return response.data;
};


export const getAllPatientBloodPressure = async (
  id: number , skip ?:number
): Promise<[PatientMetricBloodPressure[],number]> => {
  const response: AxiosResponse<[PatientMetricBloodPressure[],number]> = await axios.get(
    `http://localhost:3000/metric-blood-pressure/${id}`,{
      params: {
        skip: skip || 0, 
      },
  }
  );
  return response.data;
};
