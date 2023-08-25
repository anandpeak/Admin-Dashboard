import { CChart } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ASSESSMENT_DATA } from '../../apollo/useQuery'

export const AsssesmentChart = () => {
  const initialEndDate = new Date()
  initialEndDate.setDate(initialEndDate.getDate() + 1)
  const [endDate, setEndDate] = useState(initialEndDate)
  const [startDate, setStartDate] = useState(new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000))
  const [chartData, setChartData] = useState(null)

  const { loading, error, data } = useQuery(GET_ASSESSMENT_DATA, {
    variables: { startDate, endDate },
  })

  useEffect(() => {
    if (!loading && !error && data) {
      const dailyData = data.getAssessmentData.dailyCompletedAssessmentCounts

      const datasets = [
        {
          label: 'Тоглоогүй байгаа',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: '#31b1fe',
          pointBackgroundColor: '#31b1fe',
          pointBorderColor: '#fff',
          data: dailyData.map((item) => item.invitedCount),
        },
        {
          label: 'Амжилттай',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: '#73b504	',
          pointBackgroundColor: '#73b504',
          pointBorderColor: '#fff',
          data: dailyData.map((item) => item.completedCount),
        },
        {
          label: 'Хариу нь гараагүй',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: '#fa4d56',
          pointBackgroundColor: '#fa4d56',
          pointBorderColor: '#fff',
          data: dailyData.map((item) => item.nullCount),
        },
        {
          label: 'Хүсэлт илгээсэн',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: '#FFD700',
          pointBackgroundColor: '#FFD700',
          pointBorderColor: '#fff',
          data: dailyData.map((item) => item.appliedCount),
        },
        {
          label: 'Дуусгаагүй хүмүүс',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: '#027d7a',
          pointBackgroundColor: '#027d7a',
          pointBorderColor: '#fff',
          data: dailyData.map((item) => item.startedCount),
        },
        {
          label: 'Нийт уригдсан хүмүүс',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: '#893ffc',
          pointBackgroundColor: '#893ffc',
          pointBorderColor: '#fff',
          data: dailyData.map((item) => item.totalPlayerCount),
        },
      ]

      const labels = dailyData.map((item) => `${item.year}-${item.month}-${item.day}`)

      setChartData({
        labels,
        datasets,
      })
    }
  }, [loading, error, data])
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-10 mt-2">
        <div className="mb-4 lg:mb-0">
          <label className="mr-2">From:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input shadow-sm border rounded py-1 px-2"
          />
        </div>
        <div className="mb-4 lg:mb-0">
          <label className="mr-2">Until:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(new Date(date.setHours(23, 59, 59, 999)))}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input shadow-sm border rounded py-1 px-2"
          />
        </div>
      </div>

      <div className="mx-auto">
        <CChart
          type="line"
          data={chartData}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: 'var(--cui-body-color)', // You can replace this with an actual value
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: 'var(--cui-border-color-translucent)', // You can replace this with an actual value
                },
                ticks: {
                  color: 'var(--cui-body-color)', // You can replace this with an actual value
                },
              },
              y: {
                grid: {
                  color: 'var(--cui-border-color-translucent)', // You can replace this with an actual value
                },
                ticks: {
                  color: 'var(--cui-body-color)', // You can replace this with an actual value
                },
              },
            },
          }}
        />
      </div>
    </div>
  )
}
