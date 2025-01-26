import { useContext } from "react";
import { Card } from "react-bootstrap"
import { ClipboardPlus } from 'react-bootstrap-icons';
import { GlobalUpdateContext } from "./Dashboard";
function MetricCard({ name, value, change }:any) {
const {handleShowUpdate}=useContext(GlobalUpdateContext)

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="h6 text-muted">{name}</Card.Title>
          {name!="Patient" && <ClipboardPlus style={{cursor:'alias'}}  onClick={()=>name==='Blood Pressure'?handleShowUpdate("BP"):handleShowUpdate("A1c")}/>}
        </div>
        <div className="h3 mb-0">{value}</div>
        <small className={ "text-danger"}>{change}</small>
      </Card.Body>
    </Card>
  )
}

export default MetricCard
