import { Card } from "react-bootstrap"
import { ArrowUp, ArrowDown } from "react-bootstrap-icons"

function MetricCard({ name, value, change }:any) {
  const isPositive = change.startsWith("+")

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="h6 text-muted">{name}</Card.Title>
          {isPositive ? <ArrowUp className="text-success" /> : <ArrowDown className="text-danger" />}
        </div>
        <div className="h3 mb-0">{value}</div>
        <small className={isPositive ? "text-success" : "text-danger"}>{change}</small>
      </Card.Body>
    </Card>
  )
}

export default MetricCard

