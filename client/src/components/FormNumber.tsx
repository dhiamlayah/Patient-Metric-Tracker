import Form from "react-bootstrap/Form";
import {
  PatientMetricA1c,
  PatientMetricBloodPressure,
} from "../CustomInterfaces";

interface Props {
  name: "value" | "systolic" | "diastolic";
  setData: React.Dispatch<React.SetStateAction<any>> 
}

const FormNumber = ({ setData, name }: Props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{name.toUpperCase()}</Form.Label>
      <Form.Control
        type="number"
        placeholder=">0"
        min="1"
        onChange={(e) =>
          setData((prev: PatientMetricBloodPressure | PatientMetricA1c) => {
            return { ...prev, [name]: parseInt(e.target.value) };
          })
        }
        autoFocus
      />
    </Form.Group>
  );
};

export default FormNumber;
