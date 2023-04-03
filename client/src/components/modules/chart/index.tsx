import React, { FC, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

type LineStockChartProps = {
  price: number;
  date: string;
  stockName: string;
};

type ChartOptions = {
  prices: number[];
  dates: string[];
};

export const LineStockChart: FC<LineStockChartProps> = ({
  price,
  date,
  stockName,
}) => {
  const [chartOptions, setChartOptions] = useState<ChartOptions>({
    prices: [],
    dates: [],
  });

  useEffect(() => {
    setChartOptions((prev) => ({
      prices: [...prev.prices, price],
      dates: [...prev.dates, date],
    }));
  }, [price, date]);

  const series = [
    {
      name: stockName,
      data: chartOptions.prices,
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },

    title: {
      text: "Price Movements",
      align: "left",
    },
    xaxis: {
      type: "datetime",
      categories: chartOptions.dates,
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
    yaxis: {
      opposite: false,
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        //  @ts-ignore
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};
