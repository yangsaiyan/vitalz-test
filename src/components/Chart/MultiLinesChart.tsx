"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { useGlobalStore } from "../../zustand/globalStore";
import { Skeleton } from "../ui/skeleton";

interface MultiLinesChartProps {
  data: any[];
  title: string;
  description: string;
  config: ChartConfig;
}

export default function MultiLinesChart(props: MultiLinesChartProps) {
  const { data, config, title, description } = props;

  const { isLoading } = useGlobalStore();

  const chartData = data;

  const chartConfig = {
    ...config,
  } satisfies ChartConfig;

  return isLoading ? (
    <Skeleton className="w-3/5 h-3/5" />
  ) : (
    <>
      <Card className="w-3/5 h-fit">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={Object.keys(data[0] || "date")[0]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 10)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              {Object.entries(config).map(([key, value]) => (
                <Line
                  dataKey={key}
                  type="monotone"
                  stroke={value.color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
