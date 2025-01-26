import { Container, Row, Col } from "react-bootstrap";
import TrendChart from "./TrendChart";
import MetricCard from "./MetricCard";
import { useEffect, useState } from "react";
import { getAllPatientA1c } from "../services/metric-a1c";
import {
  Patient,
  PatientMetricA1c,
  PatientMetricBloodPressure,
} from "../CustomInterfaces";
import { getPatient } from "../services/patients";
import { getAllPatientBloodPressure } from "../services/metric-blood-pressure";
import { useParams } from "react-router-dom";
import MetricsTable from "./MetricTable";

function Dashboard() {
  const [patientMetricA1c, setPatientMetricA1C] =
    useState<PatientMetricA1c[]>();
  const [patientMetricBP, setPatientMetricBP] =
    useState<PatientMetricBloodPressure[]>();
  const [curveType, setCurveTtpe] = useState<string>("B-P"); // B-P refere to blood pressure curve and A1C to a1c curve
  const [patient, setPatient] = useState<Patient>();
  const params = useParams();
  const patientId = params.id;

  const showCurve = (type: string) => {
    setCurveTtpe(type);
  };

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
      <h1 className="mb-4">Patient Metric Tracker</h1>
      {patient && (
        <Row>
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
        </Row>
      )}

      <Row>
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
