import { useMemo } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';
import { StockDataPoint } from '@api/getStockTimeSeries';

interface ApexDataPoint {
  x: Date;
  y: [number, number, number, number];
}

interface CandlestickChartProps {
  data: StockDataPoint[];
  width?: number;
}

const StockChart = ({ data, width }: CandlestickChartProps) => {
  const options = useChartOptions({ showAvgPrice: true });

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
      options={options}
      series={series}
      width={width ? `${width}px` : '100%'}
    />
  );
};

interface ChartOptions {
  showAvgPrice?: boolean;
}

const useChartOptions = ({ showAvgPrice }: ChartOptions) => {
  return useMemo<ApexOptions>(
    () => ({
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

          const direactionColor =
            close >= open ? 'text-green-500' : 'text-red-500';

          const avarage = (open + close) / 2;

          const priceView = (name: string, value: number) => `
            <li>
              <span>${name}</span>
              <span class='font-semibold ${direactionColor}'>
                $${value.toFixed(2)}
              </span>
            </li>
          `;

          return `
            <div class='flex flex-col p-2'>
              <span class='font-bold'>${format(day, 'd MMM yyyy')}</span>
              <ul class='mt-0.5 flex gap-x-2'>
                ${priceView('O:', open)}
                ${priceView('H:', high)}
                ${priceView('L:', low)}
                ${priceView('C:', close)}
              </ul>
              ${
                showAvgPrice
                  ? `
                  <div>
                    <span>AVG:<span>
                    <span class='font-semibold'>$${avarage.toFixed(2)}</span>
                  </div>`
                  : ''
              }
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
    }),
    [showAvgPrice]
  );
};

export default StockChart;
