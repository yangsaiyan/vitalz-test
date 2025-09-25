export namespace GetUserList {
  export interface Res {
    UserList: User[];
  }

  export interface User {
    ID: string;
    LoginEmail: string;
    UserName: string;
    DeviceCompany: string;
    DeviceUserID: string;
  }
}

export namespace GetUserSleepData {
  export interface Req {
    LoginEmail: string;
    DeviceUserID: string;
  }

  export interface Res {
    UserSleepData: UserSleepData[];
  }

  export interface UserSleepData {
    LoginEmail: string;
    DeviceUserID: string;
    Date: string;
    SleepOnset: string;
    WakeUpTime: string;
    Awake: string;
    Deep: string;
    Light: string;
    TotalTimeAsleep: string;
  }
}

export namespace GetUserScore {
  export interface Req {
    LoginEmail: string;
    DeviceUserID: string;
  }

  export interface Res {
    UserScore: UserScore[];
  }

  export interface UserScore {
    LoginEmail: string;
    DeviceUserID: string;
    Date: string;
    VitalzScore: number;
    ScoreType: string;
  }
}

export namespace GetUserStatics {
  export interface Req {
    LoginEmail: string;
    DeviceUserID: string;
  }

  export interface Res {
    UserStatics: UserStatics[];
  }

  export interface UserStatics {
    LoginEmail: string;
    DeviceUserID: string;
    Date: string;
    Time: string;
    HR: number;
    HRV: number;
    OxygenSaturation: number;
  }
}
