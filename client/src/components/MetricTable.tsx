import { Table } from "react-bootstrap"

function MetricsTable({name , data}:any) {
    let reversetData = data?.slice().reverse();
return (
    <div className="table-responsive">
        <h5 className="mb-3">{`Table Of ${name}`}</h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            {name==="A1C"?<th>Value</th>:<th>systolic/diastolic</th>}
          </tr>
        </thead>
        <tbody>
        {reversetData && reversetData.length>0 && reversetData.map((record:any)=>{
                  return  <tr key={record.id}>
                    <td>{record.recorded_at}</td>
                    {name==="A1C"?<td>{record.value}</td>:<td>{`${record.systolic}/${record.diastolic}`}</td>}
                  </tr>
        })}
        </tbody>
      </Table>
    </div>
  )
}

export default MetricsTable

