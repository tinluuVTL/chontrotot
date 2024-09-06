import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { getDaysInMonth, getDaysInRange, getMonthInYear, getMonthsInRange } from "~/utilities/fn"
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const createOptions = (chartData) => {
  return {
    responsive: true,
    pointRadius: 0,
    scales: {
      y: {
        min:
          Math.min(...chartData?.map((el) => +el.counter)) - 3 < 0
            ? 0
            : Math.min(...chartData?.map((el) => +el.counter)) - 3,
        max: Math.max(...chartData?.map((el) => +el.counter)) + 3,
      },
    },
    plugins: {
      legend: false,
    },
  }
}
const LineChart = ({ data, isMonth, customTime }) => {
  const [chartData, setChartData] = useState([])
  const [options, setOptions] = useState({})
  useEffect(() => {
    const number = isMonth
      ? getMonthsInRange(customTime?.from, customTime?.to)
      : getDaysInRange(customTime?.from, customTime?.to)
    const daysInMonth = getDaysInMonth(customTime?.to, number)
    const monthsInYear = getMonthInYear(customTime?.to, number)
    const rawData = isMonth ? monthsInYear : daysInMonth
    const editedData = rawData.map((el) => {
      return {
        counter: data?.some((i) => i.createdOn === el)
          ? data.find((i) => i.createdOn === el)?.postCounter
          : 0,
        date: el,
      }
    })
    setChartData(editedData)
    const opts = createOptions(editedData)
    setOptions(opts)
  }, [data])
  return (
    <Line
      options={options}
      id="line-chart"
      data={{
        labels: chartData?.map((el) => el.date),
        datasets: [
          {
            data: chartData?.map((el) => +el.counter),
            borderColor: "#e35050",
            tension: 0.2,
            borderWidth: 2,
            pointBackgroundColor: "white",
            pointHoverRadius: 4,
            pointBorderColor: "#e35050",
            pointHoverBorderWidth: 4,
          },
        ],
      }}
    />
  )
}

export default LineChart
