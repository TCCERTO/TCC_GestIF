import { Bar } from 'react-chartjs-2'

const ReportChart = ({ data: { total, numA } }) => {
  return (
    <Bar
      data={{
        labels: total.map(c => c.month),
        datasets: [
          {
            label: 'Logs de Alunos',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,255,112,0.4)',
            borderColor: 'rgba(75,255,112,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,255,112,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,255,112,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: total.map(c => c.count)
          },
          {
            label: 'Atividades acessadas',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgb(77, 77, 255, 0.5)',
            borderColor: 'rgb(77, 77, 255, 1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(77, 77, 255, 1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(77, 77, 255, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: numA.map(c => c.count)
          }
        ]
      }}
    />
  )
}

export default ReportChart
