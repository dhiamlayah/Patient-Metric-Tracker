import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ModalEntity from "./ModalEntity";
import FormNumber from "./FormNumber";
import FormDate from "./FormDate";
import { PatientMetricA1c } from "../CustomInterfaces";
import { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import { createMetricA1c } from "../services/metric-a1c";
import { GlobalUpdateContext } from "./Dashboard";

interface Props {
  showA1c: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateA1c({ showA1c, setRerender }: Props) {
  const { handleShowUpdate, patientId } = useContext(GlobalUpdateContext);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const [newA1c, setNewA1c] = useState<PatientMetricA1c>({
    patient_id: patientId,
    value: 0,
    recorded_at: new Date().toISOString().split("T")[0],
  });
  const handleClose = () => handleShowUpdate("close");

  const createNewBloodPressure = async () => {
    try {
      if (newA1c.value > 0) {
        await createMetricA1c(newA1c).then(() => {
          setSuccessMessage("A1C Updated Successfully");
          setRerender((prev: boolean) => !prev); //call the mother component to rerender patient data
          setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
            handleClose(); //after 3s close the box
          }, 1500);
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
        show={showA1c}
        title={"Hemoglobin A1c"}
        handleClose={handleClose}
        createData={createNewBloodPressure}
      >
        <Modal.Body>
          <Form>
            <FormNumber setData={setNewA1c} name="value" />
            <FormDate setData={setNewA1c} data={newA1c} />
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

export default UpdateA1c;
