import { CChart } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ASSESSMENT_DATA } from '../../apollo/useQuery'

export const AsssesmentChart = () => {
  const [endDate, setEndDate] = useState(new Date())
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
          label: 'Урьсан',
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
          label: 'Нийт тоголсон хүмүүс',
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
    <div>
      <div className="flex gap-10 mt-2">
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>From: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input shadow-sm border rounded ps-2"
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>Until: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            className="date-picker-input shadow-sm border rounded ps-2"
          />
        </div>
      </div>

      <CChart
        type="line"
        data={chartData}
        options={{
          plugins: {
            legend: {
              labels: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
        }}
      />
    </div>
  )
}
