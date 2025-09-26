import { useParams } from "react-router";
import { GET_KEY } from "../@api/method_constant";
import { MultiLinesChart } from "../components/Chart/MultiLinesChart";
import { colors, colorList, DATA_LABEL } from "../constant";
import type { ChartConfig } from "../components/ui/chart";
import { useUserStore } from "../zustand/userStore";
import type { GetUserStatics } from "../@api/type";
import { useEffect, useState } from "react";
import { Datepicker } from "../components/Datepicker/Datepicker";

export default function View() {
  const { LoginEmail, DeviceUserID, DataType } = useParams();
  const { userStatics } = useUserStore();

  const [date, setDate] = useState<string>("");

  function ChartComponent(key: string) {
    if (key === GET_KEY.GET_USER_SLEEP_DATA) {
      // return <SleepDataChart />;
    }
    if (key === GET_KEY.GET_USER_SCORE) {
      // return <ScoreChart />;
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
    if (
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
