import { Card } from "react-bootstrap"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

function TrendChart({ data, metrics }:any) {
  const colors = ["#8884d8", "#82ca9d", "#D20103"]
  console.log('data from courb',data)
  console.log('metrics from courb',metrics)
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Metrics Trends</Card.Title>
        <div style={{ height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="recorded_at" />
              <YAxis />
              <Tooltip />
              <Legend />
              {metrics.map((metric:string, index:number) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={colors[2]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  )
}

export default TrendChart

