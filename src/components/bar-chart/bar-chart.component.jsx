import React from 'react'
import { defaults, Bar } from 'react-chartjs-2'
defaults.global.tooltips.enabled = true
defaults.global.legend.position = 'bottom'

const BarChart = ({QuestionTwo, QuestionFour, Dates}) => {
  return (
    <div>
      <Bar
        data={{
          labels: Dates,
          datasets: [
            {
              label: 'QuestionTwo',
              data: QuestionTwo,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'QuestionFour',
              data: QuestionFour,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'red',
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  )
}

export default BarChart
