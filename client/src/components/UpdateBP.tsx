import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { createMetricBloodPressure } from "../services/metric-blood-pressure";
import { useState } from "react";
import { PatientMetricBloodPressure } from "../CustomInterfaces";
import { Alert } from "react-bootstrap";

function UpdateBP({ handleShowUpdate, showBP, patientId,setRerender }: any) {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);
  const [newBloodPressure, setNewBloodPressure] =
    useState<PatientMetricBloodPressure>({
      patient_id: patientId,
      systolic: 0,
      diastolic: 0,
      recorded_at: new Date().toISOString().split("T")[0],
    });
  const handleClose = () => handleShowUpdate("close");

  const createNewBloodPressure = async () => {
    try {
      if (newBloodPressure.diastolic > 0 && newBloodPressure.systolic > 0) {
        await createMetricBloodPressure(newBloodPressure).then(() => {
          setSuccessMessage('Blood Pressure Updated Successfully')
          setRerender((prev:boolean)=>!prev)  //call the mother component to rerender patient data
          setTimeout(() => {
            setSuccessMessage(null);
            setErrorMessage(null);
            handleClose()   //after 3s close the box
          }, 3000);
        });
      } else {
        throw new Error("Invalid Input !!!!");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };

  return (
    <>
      <Modal
        show={showBP}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Blood Pressure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>SYSTOLIC :</Form.Label>
              <Form.Control
                type="number"
                placeholder=">0"
                min="1"
                onChange={(e) =>
                  setNewBloodPressure((prev: PatientMetricBloodPressure) => {
                    return { ...prev, systolic: parseInt(e.target.value) };
                  })
                }
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DIASTOLIC :</Form.Label>
              <Form.Control
                type="number"
                placeholder=">0"
                min="1"
                onChange={(e) =>
                  setNewBloodPressure((prev: PatientMetricBloodPressure) => {
                    return { ...prev, diastolic: parseInt(e.target.value) };
                  })
                }
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>RECORDED AT :</Form.Label>
              <Form.Control
                type="date"
                value={newBloodPressure.recorded_at.toString()}
                onChange={(e) =>
                  setNewBloodPressure((prev: PatientMetricBloodPressure) => {
                    return { ...prev, recorded_at: e.target.value };
                  })
                }
                autoFocus
              />
            </Form.Group>
            {successMessage&& <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="success" onClick={() => createNewBloodPressure()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateBP;
