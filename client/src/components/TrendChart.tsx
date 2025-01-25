import { Card } from "react-bootstrap"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

function TrendChart({ data, metrics }:any) {
  const colors = ["#8884d8", "#82ca9d", "#ffc658"]
  console.log("data",data)
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Metrics Trends</Card.Title>
        <div style={{ height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {metrics.map((metric, index) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={colors[index % colors.length]}
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

