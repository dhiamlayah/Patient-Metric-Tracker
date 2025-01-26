import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPatientA1c } from "../services/metric-a1c";
import { getPatient } from "../services/patients";
import { getAllPatientBloodPressure } from "../services/metric-blood-pressure";
import MetricsTable from "./MetricTable";
import AllTrendChart from "./AllTrendChart";
import AllMetricCard from "./AllMetricCard";
import {
  Patient,
  PatientMetricA1c,
  PatientMetricBloodPressure,
} from "../CustomInterfaces";

function Dashboard() {
  const [patientMetricA1c, setPatientMetricA1C] =
    useState<PatientMetricA1c[]>();
  const [patientMetricBP, setPatientMetricBP] =
    useState<PatientMetricBloodPressure[]>();
  const [patient, setPatient] = useState<Patient>();

  const params = useParams();
  const patientId = params.id;

  // send a request to get A1C historyc
  const fetchPatientA1cData = async (id: string) => {
    try {
      const allPatientAtc = await getAllPatientA1c(id);
      setPatientMetricA1C(allPatientAtc);
    } catch (error: any) {
      console.log("err"); //handle the error
    }
  };

  // send a request to get Blood Pressure historyc
  const fetchPatientBloodPressurData = async (id: string) => {
    try {
      const allPatientBP = await getAllPatientBloodPressure(id);
      setPatientMetricBP(allPatientBP);
    } catch (error: any) {
      console.log("err"); //handle the error
    }
  };

  // send a request to get Patient with last measure of A1C and Blood-presseur
  const fetchPatient = async (id: string) => {
    try {
      const patientData = await getPatient(id);
      setPatient(patientData);
    } catch (error: any) {
      setPatient({
        username: "UserNotFound",
        metricA1c: [],
        metricBloodPressure: [],
      });
      console.log("err"); //handle the error
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchPatient(patientId);
      fetchPatientA1cData(patientId);
      fetchPatientBloodPressurData(patientId);
    }
  }, [patientId]);

  return (
    <Container className="mt-4">
          <h1  className="mb-4">Patient Metric Tracker</h1>

      {patient && (
        <Row>
          <AllMetricCard patient={patient} />
        </Row>
      )}

      <Row>
        <AllTrendChart
          patientMetricBP={patientMetricBP}
          patientMetricA1c={patientMetricA1c}
        />
      </Row>

      <Row>
        <Col key={1} md={6}>
          <MetricsTable name="Blood Pressur" data={patientMetricBP} />
        </Col>
        <Col key={2} md={4}>
          <MetricsTable name="A1C" data={patientMetricA1c} />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
