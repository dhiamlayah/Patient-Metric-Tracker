import { Container, Row, Col } from "react-bootstrap"
import TrendChart from "./TrendChart"
import MetricCard from "./MetricCard"
import { mockData ,getCurrentMetrics} from "../utils/mockdata"

function Dashboard() {
  const currentMetrics = getCurrentMetrics()

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Patient Metric Tracker</h1>
      <Row>
        {currentMetrics.map((metric) => (
          <Col key={metric.name} md={4}>
            <MetricCard {...metric} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <TrendChart data={mockData} metrics={["Users", "Revenue", "Conversions"]} />
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard

