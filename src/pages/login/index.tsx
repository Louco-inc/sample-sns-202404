import { loginAuth } from "@/lib/loginAuth";
import { Button, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { useState } from "react";

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const login = async (): Promise<void> => {
    if (!email || !password) {
      return;
    }
    const uuid: string = await loginAuth(email, password);
    console.log({ uuid });
    // emailとパスワードでユーザーを取得
    // レスポンスでuuidを返却する
    // セッションストレージにuuidを保存
  };
  return (
    <div className="mt-20 flex justify-center">
      <FormControl className="!w-1/2" isInvalid={isError}>
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
  );
}
