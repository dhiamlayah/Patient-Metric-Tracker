import Form from "react-bootstrap/Form";
import {
  PatientMetricA1c,
  PatientMetricBloodPressure,
} from "../CustomInterfaces";

const FormDate = ({ setData }: any) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>RECORDED AT :</Form.Label>
      <Form.Control
        type="date"
        value={setData.recorded_at.toString()}
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
