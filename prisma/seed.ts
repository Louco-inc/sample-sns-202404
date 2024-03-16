import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("ユーザーのインサート");
  const mockUsers = [
    {
      nickname: "Yamada Taro",
      email: "sample1@example.com",
      password: "password1",
      uuid: "bf608746-8199-4ddf-87ad-0147d03cf581",
    },
    {
      nickname: "佐藤次郎",
      email: "sample2@example.com",
      password: "password2",
      uuid: "91144670-63e5-4da3-8c3e-1605c3648669",
    },
    {
      nickname: "五郎丸",
      email: "sample3@example.com",
      password: "password3",
      uuid: "03b20311-6270-4906-b20b-f81d180c2a6b",
    },
  ];
  const createdUsers = Promise.all(
    mockUsers.map(
      async (user) =>
        await prisma.user.create({
          data: {
            nickname: user.nickname,
            password: user.password,
            email: user.email,
            uuid: user.uuid,
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
