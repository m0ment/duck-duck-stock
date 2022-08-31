import { useMemo } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';

export interface StockDataPoint {
  day: Date;
  open: number;
  hight: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  data: StockDataPoint[];
  width?: number;
}

const StockChart = ({ data, width }: CandlestickChartProps) => {
  const series = useMemo(
    (): ApexAxisChartSeries => [
      {
        data: data.map((point) => ({
          x: point.day,
          y: [point.open, point.hight, point.low, point.close],
        })),
      },
    ],
    [data]
  );

  return (
    <ReactApexChart
      type='candlestick'
      options={OPTIONS}
      series={series}
      width={width ? `${width}px` : '100%'}
    />
  );
};

interface ApexDataPoint {
  x: Date;
  y: [number, number, number, number];
}

const OPTIONS: ApexOptions = {
  chart: {
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      tools: {
        download: false,
      },
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#22c55e',
        downward: '#ef4444',
      },
    },
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  tooltip: {
    custom: ({ dataPointIndex, w }) => {
      const dataPoint = w.globals.initialSeries[0].data[
        dataPointIndex
      ] as ApexDataPoint;

      const {
        x: day,
        y: [open, high, low, close],
      } = dataPoint;

      const directionColor = close >= open ? 'text-green-500' : 'text-red-500';

      const priceString = (name: string, value: number) => `
        <li class='grid grid-cols-[20px_1fr]'>
          <span>
            ${name}
          </span>
          <span class='font-semibold ${directionColor}'>
            $${value.toFixed(2)}
          </span>
        </li>
      `;

      return `
        <div class='flex flex-col p-2'>
          <span class='font-bold'>${format(day, 'd MMM yyyy')}</span>
          <ul class='mt-1'>
            ${priceString('O:', open)}
            ${priceString('H:', high)}
            ${priceString('L:', low)}
            ${priceString('C:', close)}
          </ul>
        </div
      `;
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    tickAmount: 12,
    labels: {
      formatter: (value) => `$${value.toFixed(2)}`,
      style: {
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: '14px',
      },
    },
  },
};

export default StockChart;
