import { Col } from "react-bootstrap";
import MetricCard from "./MetricCard";

const AllMetricCard = ({patient}:any) => {
  return (
    <>
      <Col key={1} md={4}>
        <MetricCard name={"Patient"} value={patient.username} />
      </Col>
      <Col key={2} md={4}>
        <MetricCard
          name={"Blood Pressure"}
          value={
            patient.metricBloodPressure.length !== 0
              ? `${patient.metricBloodPressure[0].systolic}/${patient.metricBloodPressure[0].diastolic}`
              : "Still Didn't Measure Yet "
          }
          change={patient.metricBloodPressure[0]?.recorded_at}
        />
      </Col>
      <Col key={3} md={4}>
        <MetricCard
          name={"Hemoglobin A1c"}
          value={
            patient.metricA1c.length !== 0
              ? patient.metricA1c[0].value
              : "Still Didn't Measure Yet "
          }
          change={patient.metricA1c[0]?.recorded_at}
        />
      </Col>
    </>
  );
};

export default AllMetricCard;
