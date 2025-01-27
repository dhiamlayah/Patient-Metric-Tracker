import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { createMetricBloodPressure } from "../services/metric-blood-pressure";
import { useState } from "react";
import { PatientMetricBloodPressure } from "../CustomInterfaces";
import { Alert } from "react-bootstrap";
import ModalEntity from "./ModalEntity";
import FormDate from "./FormDate";
import FormNumber from "./FormNumber";


interface Props {
  handleShowUpdate:(name:string)=>void
  showBP:boolean,
  patientId:string | undefined ,
  setRerender:React.Dispatch<React.SetStateAction<boolean>>;
}



function UpdateBP({ handleShowUpdate, showBP, patientId, setRerender }: Props) {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const [newBloodPressure, setNewBloodPressure] =
    useState<PatientMetricBloodPressure>({
      patient_id: patientId ?parseInt(patientId):NaN ,
      systolic: 0,
      diastolic: 0,
      recorded_at: new Date().toISOString().split("T")[0],
    });
  const handleClose = () => handleShowUpdate("close");

  const createNewBloodPressure = async () => {
    try {
      if (newBloodPressure.diastolic > 0 && newBloodPressure.systolic > 0) {
        await createMetricBloodPressure(newBloodPressure).then(() => {
          setSuccessMessage("Blood Pressure Updated Successfully");
          setRerender((prev: boolean) => !prev); //call the mother component to rerender patient data
          setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
            handleClose(); //after 3s close the box
          }, 3000);
        });
      } else {
        throw new Error("Invalid Input !!!!");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  return (
    <>
      <ModalEntity
        show={showBP}
        title={"Blood Pressure"}
        handleClose={handleClose}
        createData={createNewBloodPressure}
      >
        <Modal.Body>
          <Form>
            <FormNumber setData={setNewBloodPressure} name="systolic" />
            <FormNumber setData={setNewBloodPressure} name="diastolic" />
            <FormDate setData={setNewBloodPressure} data={newBloodPressure}/>
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
          </Form>
        </Modal.Body>
      </ModalEntity>
    </>
  );
}

export default UpdateBP;
