import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);



export const options = {
  responsive: true,
  maintainAspectRatio: false,
  tension: 0.2,


  scales: {
            x: {
              type: 'time',

              title: {
                text: 'time',
                display: true,
              },
            },
            y: {
              title: {
                text: 'price',
                display: true,
              },
            },
        },
  plugins: {
    title: {
      display: true,
      text: 'Price chance over time',
    },
  },
};




const Graph = ({data, colours}) => {
  let labels = data.map(function(value,index) { return value[0]; });
  let values = data.map(function(value,index) { return value[1]; });
  console.log(colours)
  let lineChartData = {}; //declare an object

  lineChartData.datasets = []; //add 'datasets' array element to object

  for (let i = 0; i < labels.length; i++){
    let dataset = {}

    dataset["id"] = i
    dataset["data"] = values[i]
    dataset["borderColor"] = colours[i]
    dataset["label"] = labels[i]
    lineChartData.datasets.push(dataset)
  }

  console.log(lineChartData)
  return (
    <div className="chart-container" style={{position: "relative", height:"70vh", width:"100%"}}>
      <Line options={options} data={lineChartData} />
    </div>
  )
}

export default Graph
