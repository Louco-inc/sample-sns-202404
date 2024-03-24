import { User } from "@/types";
import { RecoilState, RecoilValue, atom, selector } from "recoil";

const defaultValue: User = {
  id: -100,
  createdAt: new Date(),
  updatedAt: new Date(),
  nickname: "",
  email: "",
  password: "",
  uuid: "",
};

const userInfoState: RecoilState<User> = atom<User>({
  key: "userStateValue",
  default: defaultValue,
});

export const userInfoSelector = selector<User>({
  key: "userStateSelector",
  get: ({ get }) => {
    const userInfoData = sessionStorage.getItem("sample-sns-app-user-info");
    const userInfoValue = get(userInfoState);
    if (userInfoData && userInfoValue) {
      const parsedUserInfo: RecoilValue<User> = JSON.parse(userInfoData);
      return parsedUserInfo;
    } else {
      return defaultValue;
    }
  },
  set: ({ set }, newVal) => {
    sessionStorage.setItem("sample-sns-app-user-info", JSON.stringify(newVal));
    set(userInfoState, newVal ?? defaultValue);
  },
});
