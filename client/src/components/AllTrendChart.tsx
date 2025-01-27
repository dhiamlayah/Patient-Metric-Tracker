import { useState } from "react";
import TrendChart from "./TrendChart";
import { Col } from "react-bootstrap";
import { PatientMetricA1c, PatientMetricBloodPressure } from "../CustomInterfaces";

interface Props  {
  patientMetricBP:PatientMetricBloodPressure[] | undefined,
  patientMetricA1c:PatientMetricA1c[] | undefined
}


const AllTrendChart = ({patientMetricBP,patientMetricA1c}:Props) => {
      const [curveType, setCurveTtpe] = useState<string>("B-P"); // B-P refere to blood pressure curve and A1C to a1c curve
    const showCurve = (type: string) => {
        setCurveTtpe(type);
    };
  return (
    <>
      <Col key={4}>
        {curveType === "B-P" ? (
          <TrendChart
            name="Blood Pressur Historic"
            data={patientMetricBP}
            metrics={["systolic", "diastolic"]}
          />
        ) : (
          <TrendChart
            name="A1C Historic"
            data={patientMetricA1c}
            metrics={["value"]}
          />
        )}
      </Col>

      <Col key={5} md={1}>
        <button
          type="button"
          className={`btn  d-md-block mb-md-2 mt-md-5 mx-4 mx-md-0  ${
            curveType === "A1C" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => showCurve("A1C")}
        >
          A1C
        </button>
        <button
          type="button"
          className={`btn  d-md-block  ${
            curveType === "B-P" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => showCurve("B-P")}
        >
          B-P
        </button>
      </Col>
    </>
  );
};

export default AllTrendChart;
