import { create } from "zustand";
import axiosGet from "../@api/axios_get";
import type {
  GetUserList,
  GetUserSleepData,
  GetUserScore,
  GetUserStatics,
} from "../@api/type";
import { GET_KEY } from "../@api/method_constant";

interface UserStore {
  userList: GetUserList.User[];
  userSleepData: GetUserSleepData.UserSleepData[];
  userScore: GetUserScore.UserScore[];
  userStatics: GetUserStatics.UserStatics[];

  getUserList: () => Promise<GetUserList.Res>;
  getUserSleepData: (
    params: GetUserSleepData.Req
  ) => Promise<GetUserSleepData.Res>;
  getUserScore: (params: GetUserScore.Req) => Promise<GetUserScore.Res>;
  getUserStatics: (params: GetUserStatics.Req) => Promise<GetUserStatics.Res>;
}

export const useUserStore = create<UserStore>((set) => ({
  userList: [],
  userSleepData: [],
  userScore: [],
  userStatics: [],

  getUserList: async () => {
    const response = await axiosGet<undefined, GetUserList.Res>(
      GET_KEY.GET_USER_LIST,
      undefined
    );
    set({ userList: response.UserList });
    return response;
  },

  getUserSleepData: async (params: GetUserSleepData.Req) => {
    const response = await axiosGet<GetUserSleepData.Req, GetUserSleepData.Res>(
      GET_KEY.GET_USER_SLEEP_DATA,
      params
    );
    set({ userSleepData: response.UserSleepData });
    return response;
  },

  getUserScore: async (params: GetUserScore.Req) => {
    const response = await axiosGet<GetUserScore.Req, GetUserScore.Res>(
      GET_KEY.GET_USER_SCORE,
      params
    );
    set({ userScore: response.UserScore });
    return response;
  },

  getUserStatics: async (params: GetUserStatics.Req) => {
    const response = await axiosGet<GetUserStatics.Req, GetUserStatics.Res>(
      GET_KEY.GET_USER_STATIC,
      params
    );
    set({ userStatics: response.UserStatics });
    return response;
  },
}));
