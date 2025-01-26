import axios, { AxiosResponse } from "axios";
import { PatientMetricBloodPressure } from "../CustomInterfaces";

export const createMetricBloodPressure = async (
  patientMetricBloodPressur: PatientMetricBloodPressure
): Promise<void> => {
  try {
    const response: AxiosResponse<PatientMetricBloodPressure> =
      await axios.post(
        "http://localhost:3000/metric-blood-pressure",
        patientMetricBloodPressur
      );
    console.log(response.data);
  } catch (err) {
    console.log("Error:", err);
  }
};

export const getAllPatientBloodPressure = async (
  id: string
): Promise<PatientMetricBloodPressure[]> => {
  const response: AxiosResponse<PatientMetricBloodPressure[]> = await axios.get(
    `http://localhost:3000/metric-blood-pressure/${id}`
  );
  return response.data;
};
