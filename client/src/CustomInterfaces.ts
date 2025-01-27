export interface PatientMetricA1c {
    id?: number;
    value: number;
    recorded_at: Date | string;
    patient_id?:number
  }

  
export interface PatientMetricBloodPressure {
  id?: number;
  systolic: number;
  diastolic: number;
  recorded_at: Date | string;
  patient_id?:number 
}


  
export interface Patient {
    username: string;
    metricA1c: [
      {
        value: number;
        recorded_at: Date;
      }
    ] | [];
    metricBloodPressure: [
      {
        systolic: number;
        diastolic: number;
        recorded_at: Date;
      }
    ]| [];
  }