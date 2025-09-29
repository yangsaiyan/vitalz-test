import { useParams } from "react-router";
import { GET_KEY } from "../@api/method_constant";
import MultiLinesChart from "../components/Chart/MultiLinesChart";
import { colors, colorList, DATA_LABEL } from "../constant";
import type { ChartConfig } from "../components/ui/chart";
import { useUserStore } from "../zustand/userStore";
import type {
  GetUserScore,
  GetUserSleepData,
  GetUserStatics,
} from "../@api/type";
import { useEffect, useState } from "react";
import { Datepicker } from "../components/Datepicker/Datepicker";
import NormalBarChart from "../components/Chart/NormalBarChart";
import StackBarChart from "../components/Chart/StackBarChart";

export default function View() {
  const { LoginEmail, DeviceUserID, DataType } = useParams();
  const { userStatics, userScore, userSleepData } = useUserStore();

  const [date, setDate] = useState<string>("");

  function ChartComponent(key: string) {
    if (key === GET_KEY.GET_USER_SLEEP_DATA) {
      const data = userSleepData.data.map((item) => {
        const totalHours = Number(item.TotalTimeAsleep) / 3600;
        const deepSleep = (Number(item.Deep) / 100) * totalHours;
        const lightSleep = (Number(item.Light) / 100) * totalHours;
        const awake = (Number(item.Awake) / 100) * totalHours;
        const sleepOnset = new Date(item.SleepOnset);
        const wakeUpTime = new Date(item.WakeUpTime);
        const sleepOnsetString =
          sleepOnset.getDate() +
          "/" +
          (Number(sleepOnset.getMonth()) + 1) +
          "/" +
          sleepOnset.getFullYear() +
          " " +
          sleepOnset.toLocaleTimeString();
        const wakeUpTimeString =
          wakeUpTime.getDate() +
          "/" +
          (Number(sleepOnset.getMonth()) + 1) +
          "/" +
          sleepOnset.getFullYear() +
          " " +
          wakeUpTime.toLocaleTimeString();
        return {
          date: item.Date,
          DeepSleep: deepSleep.toFixed(2),
          LightSleep: lightSleep.toFixed(2),
          Awake: awake.toFixed(2),
          TotalTimeAsleep: `${totalHours.toFixed(2)}h`,
          SleepOnset: `${sleepOnsetString}`,
          WakeUpTime: `${wakeUpTimeString}`,
        };
      });

      const chartConfig = {
        DeepSleep: {
          label: "Deep Sleep",
          color: "#035A8C",
        },
        LightSleep: {
          label: "Light Sleep",
          color: "#82D3FF",
        },
        Awake: {
          label: "Awake",
          color: "#ADADAD",
        },
        TotalTimeAsleep: {
          label: "Total Time Asleep",
          color: "#FFFFFF",
        },
      };

      const barInfo = {
        stackId: "a",
        barList: [
          {
            dataKey: "Awake",
            color: "#ADADAD",
          },
          {
            dataKey: "LightSleep",
            color: "#82D3FF",
          },
          {
            dataKey: "DeepSleep",
            color: "#035A8C",
          },
          {
            dataKey: "TotalTimeAsleep",
            color: "transparent",
          },
          {
            dataKey: "SleepOnset",
            color: "transparent",
          },
          {
            dataKey: "WakeUpTime",
            color: "transparent",
          },
        ],
      };

      return (
        <StackBarChart
          chartData={data}
          chartConfig={chartConfig}
          xAxisdataKey="date"
          barDataKey="sleep"
          barInfo={barInfo}
          title={GET_KEY.GET_USER_SLEEP_DATA}
          description="Sleep Duration In Hour(h)"
        />
      );
    }
    if (key === GET_KEY.GET_USER_SCORE) {
      const data = userScore.data
        .map((item) => ({
          date: item.Date,
          score: item.VitalzScore,
          scoreType: item.ScoreType,
        }))
        .reverse();

      const chartConfig = {
        score: {
          label: "Score",
          color: "var(--chart-1)",
        },
        scoreType: {
          label: "Score Type",
          color: "var(--chart-2)",
        },
      } satisfies ChartConfig;

      const displayData = [
        {
          color: "#22c55e",
          text: "Recovery >= 60",
        },
        {
          color: "#f59e0b",
          text: "Mild Stress <= 59",
        },
        {
          color: "#ef4444",
          text: "No Score = 0",
        },
      ];

      return (
        <NormalBarChart
          xAxisdataKey="date"
          barDataKey="score"
          title={GET_KEY.GET_USER_SCORE}
          description={date}
          chartConfig={chartConfig}
          chartData={data}
          displayData={displayData}
        />
      );
    }
    if (key === GET_KEY.GET_USER_STATIC) {
      if (date === "") {
        return (
          <div className="w-full h-fit flex justify-center">
            <Datepicker onChange={setDate} />
          </div>
        );
      }

      const data = userStatics.data.map((item) => ({
        time: item.Time,
        HR: item.HR,
        HRV: item.HRV,
        OxygenSaturation: item.OxygenSaturation,
      }));

      const userStaticsConfig: ChartConfig = Object.fromEntries(
        DATA_LABEL.STATIC_DATA.map((item: string, index: number) => [
          item,
          {
            label: item,
            color: colors[colorList[index]],
          },
        ])
      );

      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <Datepicker onChange={setDate} />
          <MultiLinesChart
            data={data}
            title={GET_KEY.GET_USER_STATIC}
            description={date}
            config={userStaticsConfig}
          />
        </div>
      );
    }
  }

  useEffect(() => {
    if (DataType === GET_KEY.GET_USER_SLEEP_DATA) {
      const reqParams: GetUserSleepData.Req = {
        LoginEmail: LoginEmail as string,
        DeviceUserID: DeviceUserID as string,
      };
      useUserStore.getState().getUserSleepData(reqParams);
    } else if (DataType === GET_KEY.GET_USER_SCORE) {
      const reqParams: GetUserScore.Req = {
        LoginEmail: LoginEmail as string,
        DeviceUserID: DeviceUserID as string,
      };
      useUserStore.getState().getUserScore(reqParams);
    } else if (
      DataType === GET_KEY.GET_USER_STATIC &&
      LoginEmail &&
      DeviceUserID &&
      date !== ""
    ) {
      const reqParams: GetUserStatics.Req = {
        LoginEmail: LoginEmail as string,
        DeviceUserID: DeviceUserID as string,
        Date: date,
      };

      useUserStore.getState().getUserStatics(reqParams);
    }
  }, [LoginEmail, DeviceUserID, DataType, date]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {ChartComponent(DataType as string)}
    </div>
  );
}
