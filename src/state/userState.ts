import { User } from "@/types";
import { RecoilState, atom, selector } from "recoil";

const defaultUserValue: User = {
  id: "-100",
  createdAt: new Date(),
  updatedAt: new Date(),
  nickname: "",
  email: "",
  password: "",
  uuid: "",
};

export const userInfoState: RecoilState<User> = atom({
  key: "userState",
  default: defaultUserValue,
});

export const userInfoSelector = selector({
  key: "userSelector",
  get: (): User => {
    const userInfoData = sessionStorage.getItem("sample-sns-app-user-info");
    if (!userInfoData) return defaultUserValue;
    const parsedUserInfo: User = JSON.parse(userInfoData);
    return parsedUserInfo;
  },
  set: (_, newVal) => {
    sessionStorage.setItem("sample-sns-app-user-info", JSON.stringify(newVal));
  },
});
