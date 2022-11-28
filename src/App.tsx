import { useRef } from 'react';

import './App.css'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const labels = [
  'Novo mercado e modelos de negócio',
  'Estratégias de inovação na prática',
  'Tecnologias disruptivas',
  'ESG',
  'Cultura organizacional',
  'Times de alta performance',
];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Sua pontuação',
      borderColor: '#0080ED',
      backgroundColor: '#0080ED8f',
      data: [25, 59, 90, 81, 60, 82],
      pointBorderColor: '#0080ED',
      pointBackgroundColor: '#0080ED',
    },
    {
      fill: true,
      label: '',
      borderColor: '#0000008f',
      backgroundColor: 'transparent',
      data: [100, 100, 100, 100, 100, 100],
      pointBorderColor: '#000000',
      pointBackgroundColor: '#000000',
    },
  ],
};

const getLabelIndex = (x: number, y: number, pointLabels: any[]) => {
  let elementIndex = -1;

  for(let i = 0; i < pointLabels.length; i++) {
    const { top, right, bottom, left } = pointLabels[i];

    if(x >= left && x <= right && y >= top && y <= bottom) {
      elementIndex = i;
      break;
    }
  }
  return elementIndex;
}

const options: ChartOptions<'radar'> = {
  responsive: true,
  onHover: ({ x = 0, y = 0 }, activeHover, chart) => {
    const { canvas, scales } = chart;
    const scale = scales.r as any;
    const labelIndex = getLabelIndex(x || 0, y || 0, scale._pointLabelItems);

    if(labelIndex === -1) {
      canvas.style.cursor = 'default';
    } else {
      canvas.style.cursor = 'pointer';
    }
  },
  onClick: ({ x = 0, y = 0 }, activeClick, chart) => {
    const { scales } = chart;
    const scale = scales.r as any;
    const labelIndex = getLabelIndex(x || 0, y || 0, scale._pointLabelItems);

    if(labelIndex === -1) {
      return;
    }
    const selectedLabel = scale._pointLabels[labelIndex];
    console.log(`clicked at ${labelIndex} - ${selectedLabel}`);
  },
  scales: {
    r: {
      ticks: {
        display: false,
        maxTicksLimit: 1,
      },
      grid: { color: '#0000008f' },
      angleLines: { color: 'transparent' },
      pointLabels: {
        font: { size: 12, weight: 'bold' },
        color: '#0080ec',
      }
    }
  },
  elements: {
    line: {
      borderWidth: 3,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};


function App() {
  return (
    <div className="App">
      StartSe Assessment
      <Radar id="radar" width={800} data={data} options={options} />
    </div>
  )
}

export default App;
