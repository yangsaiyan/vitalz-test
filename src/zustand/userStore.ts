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
  userList: GetUserList.Res;
  userSleepData: GetUserSleepData.Res;
  userScore: GetUserScore.Res;
  userStatics: GetUserStatics.Res;
  searchUserList: GetUserList.Res;

  getUserList: () => Promise<GetUserList.Res>;
  getUserSleepData: (
    params: GetUserSleepData.Req
  ) => Promise<GetUserSleepData.Res>;
  getUserScore: (params: GetUserScore.Req) => Promise<GetUserScore.Res>;
  getUserStatics: (params: GetUserStatics.Req) => Promise<GetUserStatics.Res>;

  handleSearchUserList: (search: string, key: keyof GetUserList.User) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userList: { status: 0, data: [] },
  userSleepData: { status: 0, data: [] },
  userScore: { status: 0, data: [] },
  userStatics: { status: 0, data: [] },
  searchUserList: { status: 0, data: [] },

  getUserList: async () => {
    const response = await axiosGet<undefined, GetUserList.Res>(
      GET_KEY.GET_USER_LIST,
      undefined
    );
    set({ searchUserList: response });
    set({ userList: response });
    return response;
  },

  getUserSleepData: async (params: GetUserSleepData.Req) => {
    const response = await axiosGet<GetUserSleepData.Req, GetUserSleepData.Res>(
      GET_KEY.GET_USER_SLEEP_DATA,
      params
    );
    set({ userSleepData: response });
    return response;
  },

  getUserScore: async (params: GetUserScore.Req) => {
    const response = await axiosGet<GetUserScore.Req, GetUserScore.Res>(
      GET_KEY.GET_USER_SCORE,
      params
    );
    set({ userScore: response });
    return response;
  },

  getUserStatics: async (params: GetUserStatics.Req) => {
    const response = await axiosGet<GetUserStatics.Req, GetUserStatics.Res>(
      GET_KEY.GET_USER_STATIC,
      params
    );
    set({ userStatics: response });
    return response;
  },

  handleSearchUserList: (
    search: string,
    key: keyof GetUserList.User = "ID"
  ) => {
    set({
      searchUserList: {
        status: get().userList.status,
        data: get().userList.data.filter((user) => user[key]?.includes(search)),
      },
    });

    console.log(get().searchUserList);
  },
}));
