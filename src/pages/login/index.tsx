import { loginAuth } from "@/lib/loginAuth";
import { AlertType } from "@/types";
import { Button, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { useState } from "react";
import AlertComponent from "@/components/AlertComponent";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const login = async (): Promise<void> => {
    if (!email || !password) {
      return;
    }
    const uuid: string = await loginAuth(email, password);
    if (uuid) {
      // セッションストレージにuuidを保存
      console.log({ uuid });
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
