import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: {
    isLogin: false,
  },
});

export const profileState = atom({
  key: "profileState",
  default: '',
});