"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

interface StackBarChartProps {
  chartData: any[];
  chartConfig: ChartConfig;
  xAxisdataKey: string;
  barDataKey: string;
  barInfo: any;
  title: string;
  description: string;
}

export default function StackBarChart(props: StackBarChartProps) {
  const {
    chartData,
    chartConfig,
    xAxisdataKey,
    barDataKey,
    barInfo,
    title,
    description,
  } = props;

  return (
    <Card className="w-4/5 h-fit">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xAxisdataKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={barDataKey}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            {barInfo.barList.map((item: any, index: number) => (
              <Bar
                key={index}
                dataKey={item.dataKey}
                stackId={barInfo.stackId}
                fill={item.color}
                radius={
                  index === 0
                    ? [0, 0, 4, 4]
                    : index === 1
                    ? [0, 0, 0, 0]
                    : [4, 4, 0, 0]
                }
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
