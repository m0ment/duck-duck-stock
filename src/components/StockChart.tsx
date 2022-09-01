import { useEffect, useMemo, useRef, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';

import Checkbox from './core/Checkbox';
import DateRangePicker from './core/DateRangePicker';
import type { StockTimeSeries } from '@api/getStockTimeSeries';
import { isEqual, isInRange } from '@utils/date';

interface StockChartProps {
  stockTimeSeries: StockTimeSeries;
  width?: number;
}

const StockChart = ({ stockTimeSeries, width }: StockChartProps) => {
  const { meta, data } = stockTimeSeries;

  const chartRef = useRef<ReactApexChart>(null);

  const [fromDate, setFromDate] = useState(meta.startDate);
  const [toDate, setToDate] = useState(meta.endDate);

  const [showAvgPrices, setShowAvgPrices] = useState(true);

  const options = useChartOptions({ showAvgPrices });

  const series = useMemo<ApexAxisChartSeries>(
    (): ApexAxisChartSeries => [
      {
        data: data
          .filter((dataPoint) => isInRange(dataPoint.day, fromDate, toDate))
          .map((dataPoint) => ({
            x: dataPoint.day,
            y: [
              dataPoint.open,
              dataPoint.hight,
              dataPoint.low,
              dataPoint.close,
            ],
          })),
      },
    ],
    [data, fromDate, toDate]
  );

  useEffect(() => {
    // FIXME: This workaround is because the ReactApexChart doesn't update the options
    const chartComp = chartRef.current as any;
    (chartComp?.chart as ApexCharts).updateOptions(options);
  }, [options]);

  const handleResetDatesClick = () => {
    setFromDate(meta.startDate);
    setToDate(meta.endDate);
  };

  return (
    <div>
      <div className='inline-flex items-center divide-x-2 divide-gray-200'>
        {/* Date Range Filters */}
        <div className='pr-4'>
          <DateRangePicker
            fromDate={fromDate}
            toDate={toDate}
            startDate={stockTimeSeries.meta.startDate}
            endDate={stockTimeSeries.meta.endDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
          />
          <button
            className='ml-4 h-10 rounded-xl border border-gray-300 bg-white px-3 text-sm font-medium text-red-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400'
            onClick={handleResetDatesClick}
            disabled={
              isEqual(fromDate, meta.startDate) && isEqual(toDate, meta.endDate)
            }
          >
            Reset Dates
          </button>
        </div>
        <div className='pl-4'>
          <div className='inline-flex items-center gap-x-1.5'>
            <Checkbox checked={showAvgPrices} onChange={setShowAvgPrices} />
            <span className='text-sm font-medium text-gray-900'>
              Show Avarage Prices
            </span>
          </div>
        </div>
      </div>
      <ReactApexChart
        ref={chartRef}
        type='candlestick'
        options={options}
        series={series}
        width={width ? `${width}px` : '100%'}
      />
    </div>
  );
};

interface ApexDataPoint {
  x: Date;
  y: [number, number, number, number];
}

const useChartOptions = ({ showAvgPrices }: { showAvgPrices?: boolean }) => {
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
                showAvgPrices
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
    [showAvgPrices]
  );
};

export default StockChart;
