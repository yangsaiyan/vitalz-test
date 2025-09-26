export const KEY_SELECT_KEYS = [
  "ID",
  "LoginEmail",
  "UserName",
  "DeviceCompany",
  "DeviceUserID",
];

export const colors = {
  red: "#FF0000",
  blue: "#0000FF",
  green: "#00FF00",
  yellow: "#FFFF00",
  purple: "#800080",
  orange: "#FFA500",
  pink: "#FFC0CB",
  brown: "#A52A2A",
  teal: "#008080",
  cyan: "#00FFFF",
  lime: "#00FF00",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
};

export const colorList = Object.keys(colors) as (keyof typeof colors)[];

export const DATA_LABEL = {
  SLEEP_DATA: [
    "SleepOnset",
    "WakeUpTime",
    "Awake",
    "Deep",
    "Light",
    "TotalTimeAsleep",
  ],
  SCORE_DATA: ["Date", "VitalzScore", "ScoreType"],
  STATIC_DATA: ["HR", "HRV", "OxygenSaturation"],
};
