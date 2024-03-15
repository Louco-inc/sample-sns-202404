import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("ユーザーのインサート");
  const mockUsers = [
    {
      nickname: "Yamada Taro",
      password: "password1",
    },
    {
      nickname: "佐藤次郎",
      password: "password2",
    },
    {
      nickname: "五郎丸",
      password: "password3",
    },
  ];
  const createdUsers = Promise.all(
    mockUsers.map(
      async (user) =>
        await prisma.user.create({
          data: {
            nickname: user.nickname,
            password: user.password,
            posts: {
              create: [],
            },
            comments: {
              create: [],
            },
            favorites: {
              create: [],
            },
          },
        })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
