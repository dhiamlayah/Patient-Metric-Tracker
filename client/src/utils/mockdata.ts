export const generateMockData = (days:any) => {
  const data = []
  const metrics = ["Users", "Revenue", "Conversions"]
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    const entry :any = { date: date.toISOString().split("T")[0] }

    metrics.forEach((metric:any) => {
      entry[metric] = Math.floor(Math.random() * 1000)
    })

    data.push(entry)
  }

  return data
}

export const mockData = generateMockData(30)

export const getCurrentMetrics = () => {
  return [
    { name: "Patient", value: "dhia", change: "+5%" },
    { name: "Blood Pressure", value: "5", change: "+2.5%" },
    { name: "Hemoglobin A1c", value: "3" , change: "-1%" },
  ]
}

