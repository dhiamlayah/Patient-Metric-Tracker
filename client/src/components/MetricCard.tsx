import { useContext } from "react";
import { Card } from "react-bootstrap"
import { ClipboardPlus } from 'react-bootstrap-icons';
import { GlobalUpdateContext } from "./Dashboard";

interface Props {
  name : string ,
  value : number | string ,
  date ?: Date | string ,
}

function MetricCard({ name, value, date }:Props) {

const {handleShowUpdate}=useContext(GlobalUpdateContext)

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="h6 text-muted">{name}</Card.Title>
          {name!="Patient" && <ClipboardPlus style={{cursor:'alias'}}  onClick={()=>name==='Blood Pressure'?handleShowUpdate("BP"):handleShowUpdate("A1c")}/>}
        </div>
        <div className="h3 mb-0">{value}</div>
        {date &&  <small className={ "text-danger"}>{`${date}`}</small> }
      </Card.Body>
    </Card>
  )
}

export default MetricCard
