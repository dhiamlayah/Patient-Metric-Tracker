import { AvgMetricA1c, AvgMetricBloodPressure } from "../CustomInterfaces";

export const concatYearWithMonthA1c = (data: AvgMetricA1c[]) => {
  return data.map((row) => {
    return {
      date: `${row.year}/${row.month}`,
      average_value: row.average_value,
    };
  });
};

export const concatYearWithMonthBP = (data: AvgMetricBloodPressure[]) => {
  return data.map((row) => {
    return {
      date: `${row.year}/${row.month}`,
      average_diastolic: row.average_diastolic,
      average_systolic: row.average_systolic,
    };
  });
};
