import { Container, Row, Col } from "react-bootstrap";
import TrendChart from "./TrendChart";
import MetricCard from "./MetricCard";
import { mockData, getCurrentMetrics } from "../utils/mockdata";
import { useEffect, useState } from "react";
import { getAllPatientA1c } from "../services/metric-a1c";
import { Patient } from "../CustomInterfaces";
import { getPatient } from "../services/patients";

function Dashboard() {
  const currentMetrics = getCurrentMetrics();
  const [patientMetricA1c, setPatientMetricA1C] = useState<any>([]);
  const [patient, setPatient] = useState<Patient>();

  // send a request to get A1C historyc
  const fetchPatientA1cData = async () => {
    const allPatientAtc = await getAllPatientA1c(1);
    setPatientMetricA1C(allPatientAtc);
  };

  // send a request to get Patient with last measure of A1C and Blood-presseur
  const fetchPatient = async () => {
    const patientData = await getPatient(1);
    setPatient(patientData);
  };

  useEffect(() => {
    fetchPatient();
    fetchPatientA1cData();
  }, []);

  // console.log("patient a1C", patientMetricA1c);
  // console.log("patient ", patient);
  console.log("fake data schema ", mockData);
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Patient Metric Tracker</h1>
      {patient && (
        <Row>
          <Col key={1} md={4}>
            <MetricCard
              name={"Patient"}
              value={patient.username}
            />
          </Col>
          <Col key={2} md={4}>
            <MetricCard
              name={"Blood Pressure"}
              value={patient.metricBloodPressure.length>0 ? 
                `${patient.metricBloodPressure[0].systolic}/${patient.metricBloodPressure[0].diastolic}`
                : "Still Didn't Measure Yet "
              }
              change={patient.metricBloodPressure[0]?.recorded_at}
            />
          </Col>
          <Col key={3} md={4}>
            <MetricCard
              name={"Hemoglobin A1c"}
              value={patient.metricA1c.length>0?
                patient.metricA1c[0]?.value
                : "Still Didn't Measure Yet "
              }
              change={patient.metricA1c[0]?.recorded_at}
            />
          </Col>
        </Row>
      )}
     {patientMetricA1c && <Row>
        <Col>
          {/* <TrendChart
            data={mockData}
            metrics={["Users", "Revenue", "Conversions"]}
          /> */}
          <TrendChart
            data={patientMetricA1c}
            metrics={["value"]}
          />
        </Col>
      </Row>}
    </Container>
  );
}

export default Dashboard;
