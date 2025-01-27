import { Table } from "react-bootstrap";
import {
  PatientMetricA1c,
  PatientMetricBloodPressure,
} from "../CustomInterfaces";
interface Props {
  name: "Blood Pressur" | "A1C";
  data: PatientMetricBloodPressure[] | PatientMetricA1c[] | undefined;
  nbrData: number;
  getMore: React.Dispatch<React.SetStateAction<boolean>>; // Corrected type for setter
}

function MetricsTable({ name, data, nbrData,getMore }: Props) {
  return (
    <div className="table-responsive">
      <h5 className="mb-3">{`Table Of ${name}`}</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            {name === "A1C" ? <th>Value</th> : <th>systolic/diastolic</th>}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map(
              (record: PatientMetricA1c | PatientMetricBloodPressure) => {
                return (
                  <tr key={record.id}>
                    <td>{`${record.recorded_at}`}</td>
                    {name === "A1C" && "value" in record ? (
                      <td>{record.value}</td>
                    ) : "systolic" in record  ? ( 
                      <td>{`${record.systolic}/${record.diastolic}`}</td>
                    ) : (
                      <td>Unknown</td>
                    )}
                  </tr>
                );
              }
            )}
        </tbody>
      </Table>
      {nbrData !== data?.length && (
        <p className="text-end " style={{ cursor: "pointer" } }   onClick={()=>getMore((prev:boolean)=>{return !prev})}>
          See more +
        </p>
      )}
    </div>
  );
}

export default MetricsTable;


