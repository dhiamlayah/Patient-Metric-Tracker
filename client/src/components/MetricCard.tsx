import { Card } from "react-bootstrap"
// import { ArrowUp, ArrowDown } from "react-bootstrap-icons"

function MetricCard({ name, value, change }:any) {

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="h6 text-muted">{name}</Card.Title>
        </div>
        <div className="h3 mb-0">{value}</div>
        <small className={ "text-danger"}>{change}</small>
      </Card.Body>
    </Card>
  )
}

export default MetricCard

