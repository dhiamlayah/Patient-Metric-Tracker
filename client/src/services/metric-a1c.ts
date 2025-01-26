import axios, { AxiosResponse } from "axios";
import { PatientMetricA1c } from "../CustomInterfaces";



export const createMetricA1c = async (
  patientMetricA1c: PatientMetricA1c
): Promise<void> => {
  try {
    const response: AxiosResponse<PatientMetricA1c> = await axios.post(
      "http://localhost:3000/metric-a1c",
      patientMetricA1c
    );
    console.log(response.data);
  } catch (err) {
    console.log("Error:", err);
  }
};

export const getAllPatientA1c = async (id: number): Promise< PatientMetricA1c[] | void  > => {
  try {
    const response: AxiosResponse<PatientMetricA1c[]> = await axios.get(
      `http://localhost:3000/metric-a1c/${id}`
    )
    return response.data
} catch (err: any) {
    console.error(`error in getAllPatientA1c  ${err.message}`);
  }
};
