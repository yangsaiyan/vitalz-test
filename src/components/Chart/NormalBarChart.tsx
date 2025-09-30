"use client";

import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";

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
import { colors } from "../../constant";
import { useGlobalStore } from "../../zustand/globalStore";
import { Skeleton } from "../ui/skeleton";

interface ChartBarDefaultProps {
  xAxisdataKey: string;
  barDataKey: string;
  title: string;
  description: string;
  chartConfig: ChartConfig;
  chartData: any[];
  displayData: any[];
}

export default function NormalBarChart(props: ChartBarDefaultProps) {
  const {
    xAxisdataKey,
    barDataKey,
    title,
    description,
    chartConfig,
    chartData,
    displayData,
  } = props;

  const { isLoading } = useGlobalStore();

  return isLoading ? (
    <Skeleton className="w-4/5 h-1/2" />
  ) : (
    <Card className="w-4/5 h-fit py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="mr-4 flex flex-col">
          {displayData.map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
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
                  hideIndicator
                />
              }
            />
            <Bar
              dataKey={barDataKey}
              fill={`var(--color-${barDataKey})`}
              radius={8}
            >
              {chartData.map((entry: any, index: number) => {
                const value = Number(entry?.[barDataKey]);
                const fill =
                  value > 60
                    ? colors["green"]
                    : value === 0
                    ? colors["red"]
                    : colors["yellow"];
                return <Cell key={`cell-${index}`} fill={fill} />;
              })}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
