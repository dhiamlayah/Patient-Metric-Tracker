export interface PatientMetricA1c {
  id?: number;
  value: number;
  recorded_at: Date | string;
  patient_id?: number;
}

export interface PatientMetricBloodPressure {
  id?: number;
  systolic: number;
  diastolic: number;
  recorded_at: Date | string;
  patient_id?: number;
}

export interface AvgMetricBloodPressure {
  year?: number | string;
  month?: number | string;
  date?: string ;      
  average_diastolic: number;
  average_systolic: number;
}

export interface AvgMetricA1c {
  year?: number | string;
  month?: number | string;
  date?: string ;
  average_value: number;
}

export interface Patient {
  id?: number;
  username: string;
  metricA1c:
    | [
        {
          value: number;
          recorded_at: Date;
        }
      ]
    | [];
  metricBloodPressure:
    | [
        {
          systolic: number;
          diastolic: number;
          recorded_at: Date;
        }
      ]
    | [];
}
