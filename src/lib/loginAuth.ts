import { User } from "@/types";

export const loginAuth = async (
  email: string,
  password: string
): Promise<User | undefined> => {
  const params = { email, password };
  return await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(params),
  })
    .then(async (r) => {
      const user: User = await r.json();
      return user;
    })
    .catch((e) => {
      console.log(e);
      // ログインできなかった旨のメッセージを表示するべき
      return undefined;
    });
};
