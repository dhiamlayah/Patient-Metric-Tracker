import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AvgMetricA1c, AvgMetricBloodPressure } from "../CustomInterfaces"

interface Props {
  data : AvgMetricA1c[] | AvgMetricBloodPressure[],
  metrics :string[]
}
const BarChartComponent = ({data,metrics}:Props) => {
     const colors = ["#ee6a29","#a7c0c7"]
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {metrics.map((mertic,index)=>{
               return  <Bar key={index} dataKey={mertic} fill={colors[index]} />
        })}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent

