import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Patient } from "../CustomInterfaces";
import { getPatients } from "../services/patients";
import { useNavigate } from "react-router-dom";

function PatientsTable() {
  const [patients, setPatients] = useState<Patient[]>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  let numberOfPatients = 0;

  const fetchPatients = async () => {
    try {
      const allPatients = await getPatients();
      setErrorMessage(null)
      setPatients(allPatients[0]);
      numberOfPatients = allPatients[1];      // this help in pagination implementation
    } catch (error: any) {
      setErrorMessage("ERROR FROM SERVER TRY AGAIN");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const sentToPatient = (id: number) => {
    navigate(`/patients/${id}`);
  };

  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr>
          <th rowSpan={2} className="text-center align-middle bg-secondary ">
            #
          </th>
          <th rowSpan={2} className="align-middle bg-secondary ">
            UserName
          </th>
          <th className="align-middle bg-secondary " colSpan={2}>
            Blood Pressure
          </th>
          <th className="align-middle bg-secondary " colSpan={2}>
            Hemoglobin A1c
          </th>
        </tr>
        <tr>
          <th style={{ backgroundColor: "darkgray" }}>dias/systo</th>
          <th style={{ backgroundColor: "darkgray" }}>recorded_at</th>
          <th style={{ backgroundColor: "darkgray" }}>value</th>
          <th style={{ backgroundColor: "darkgray" }}>recorded_at</th>
        </tr>
      </thead>
      <tbody>
        {patients &&
          patients.map((patient, index) => {
            return (
              <tr key={index} style={{cursor:"pointer"}} onClick={() => sentToPatient(patient.id)}>
                <td className="bg-secondary" >{index + 1}</td>
                <td>{patient.username}</td>
                <td>
                  {patient.metricBloodPressure.length !== 0
                    ? `${patient.metricBloodPressure[0]?.diastolic}/${patient.metricBloodPressure[0]?.systolic}`
                    : " still didn't measure yet "}
                </td>
                <td>
                  {patient.metricBloodPressure.length !== 0
                    ? `${patient.metricBloodPressure[0]?.recorded_at}`
                    : "still didn't measure yet"}
                </td>
                <td>
                  {patient.metricA1c.length !== 0
                    ? `${patient.metricA1c[0]?.value}`
                    : "still didn't measure yet"}
                </td>
                <td>
                  {patient.metricA1c.length !== 0
                    ? `${patient.metricA1c[0]?.recorded_at}`
                    : "still didn't measure yet"}
                </td>
              </tr>
            );
          })}
        {errorMessage && <tr><td colSpan={6}>{errorMessage}</td></tr>}
      </tbody>
    </Table>
  );
}

export default PatientsTable;
