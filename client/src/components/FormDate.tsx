import Form from "react-bootstrap/Form";
import {
  PatientMetricA1c,
  PatientMetricBloodPressure,
} from "../CustomInterfaces";

interface Props {
  data: PatientMetricA1c | PatientMetricBloodPressure
  setData: React.Dispatch<React.SetStateAction<any>> 
}

const FormDate = ({ setData ,data}: Props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>RECORDED AT :</Form.Label>
      <Form.Control
        type="date"
        value={data.recorded_at.toString()}
        onChange={(e) =>
            setData((prev: PatientMetricBloodPressure| PatientMetricA1c) => {
            return { ...prev, recorded_at: e.target.value };
          })
        }
        autoFocus
      />
    </Form.Group>
  );
};

export default FormDate;
