export const GET_KEY: Record<string, string> = {
  GET_USER_LIST: "GET_USER_LIST",
  GET_USER_SLEEP_DATA: "GET_USER_SLEEP_DATA",
  GET_USER_SCORE: "GET_USER_SCORE",
  GET_USER_STATIC: "GET_USER_STATIC",
};

export const GET_METHOD: Record<string, string> = {
  GET_USER_LIST: "/api/getUserList",
  GET_USER_SLEEP_DATA: "/api/getUserSleepData",
  GET_USER_SCORE: "/api/getUserScore",
  GET_USER_STATIC: "/api/getUserStatics",
};

export const GET_METHOD_ERROR: Record<string, string> = {
  GET_USER_LIST: "Failed to get user list",
  GET_USER_SLEEP_DATA: "Failed to get user sleep data",
  GET_USER_SCORE: "Failed to get user score",
  GET_USER_STATIC: "Failed to get user statics",
};
