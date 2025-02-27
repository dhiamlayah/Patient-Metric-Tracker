import { Card } from "react-bootstrap"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { PatientMetricA1c, PatientMetricBloodPressure } from "../CustomInterfaces";

interface Props {
  data : PatientMetricBloodPressure[]  | PatientMetricA1c[] | undefined,
  name : "Blood Pressur Historic" | "A1C Historic",
  metrics :string[]
}

function TrendChart({ data, metrics ,name }:Props) {
  const colors = ["#D20103", "#254A02"]
  const reversetData = data?.slice().reverse();  // I Reverse the order of data to make it more readable 

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{`Metrics Trends ${name}`} </Card.Title>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reversetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="recorded_at" />
              <YAxis />
              <Tooltip />
              <Legend />
              {metrics.map((metric:string, index:number) => (
                <Line
                  key={metric}
                  type={"monotone"}
                  dataKey={metric}
                  stroke={colors[index]}
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

