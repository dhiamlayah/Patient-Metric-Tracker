export interface PatientMetricA1c {
    id: number;
    value: number;
    recorded_at: Date;
  }

  
export interface PatientMetricBloodPressure {
  id: number;
  systolic: number;
  diastolic: number;
  recorded_at: Date;
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