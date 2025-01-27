import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { a: "11/25", sales: 4000 , by:3333  },
  { a: "11/24", sales: 3000 , by:3333 },
  { a: "11/24", sales: 2000 , by:3333 },
  { a: "11/24", sales: 2780 , by:3333 },
  { a: "11/24", sales: 1890 , by:3333 },
  { a: "11/24", sales: 2390 , by:3333 },
]

const BarChartComponent: React.FC = () => {
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
        <XAxis dataKey="a" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#ee6a29" />
        <Bar dataKey="by" fill="#ee6a29" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent

