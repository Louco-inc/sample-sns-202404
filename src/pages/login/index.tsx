import { loginAuth } from "@/lib/loginAuth";
import { AlertType, User } from "@/types";
import { Button, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AlertComponent from "@/components/AlertComponent";
import { useRouter } from "next/router";
import {
  getUUIDFromSessionStorage,
  saveUUIDToSessionStorage,
} from "@/lib/SessionStorage";
import { userInfoSelector } from "@/state/userState";
import { useSetRecoilState } from "recoil";

const alertDefaultValue = {
  title: "",
  description: "",
  status: undefined,
};

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<AlertType>(alertDefaultValue);
  const setUserInfo = useSetRecoilState<User>(userInfoSelector);
  const router = useRouter();

  useEffect(() => {
    const init = async (): Promise<void> => {
      // すでにuuidがセッションに保持されており、正しいのであればトップ画面に遷移
      // なければそのまま
      const user = await fetchUserByUuid();
      if (user) {
        setUserInfo(user);
        router.push("/");
      }
    };
    init();
  }, []);

  const fetchUserByUuid = async (): Promise<User | undefined> => {
    const uuid = getUUIDFromSessionStorage();
    if (uuid) {
      const user: User = await fetch(`/api/users/uuid/?uuid=${uuid}`)
        .then(async (r) => await r.json())
        .catch((e) => {
          console.log(e);
          return undefined;
        });
      return user;
    } else {
      return undefined;
    }
  };

  const login = async (): Promise<void> => {
    if (!email || !password) {
      return;
    }
    const user: User | undefined = await loginAuth(email, password);
    if (user) {
      // セッションストレージにuuidを保存
      saveUUIDToSessionStorage(user.uuid);
      // ステートにログインユーザーを保存
      setUserInfo(user);
      router.push("/");
    } else {
      setAlertProps({
        title: "ログインに失敗しました",
        description: "メールアドレスまたはパスワードが間違っています。",
        status: "error",
      });
    }
  };
  return (
    <>
      <div className="mt-20 flex justify-center">
        <FormControl className="!w-3/5" isInvalid={isError}>
          <Box className="mt-4">
            <FormLabel>メールアドレス</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box className="mt-4">
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <div className="mt-4">
            <Button onClick={login}>ログイン</Button>
          </div>
        </FormControl>
      </div>
      {alertProps.status && <AlertComponent alertProps={alertProps} />}
    </>
  );
}
