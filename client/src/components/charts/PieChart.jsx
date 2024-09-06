import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ datasets, labels = [], title }) => {
  const data = {
    labels,
    datasets,
  }
  return (
    <div className="col-span-1 flex items-center flex-col justify-center p-4 max-h-[400px]">
      <h1 className="font-semibold text-lg">{title}</h1>
      <Pie data={data} />
    </div>
  )
}

export default PieChart
