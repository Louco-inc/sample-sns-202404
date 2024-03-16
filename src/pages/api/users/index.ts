import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(users);
  } else if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const { email, password } = body;
    const users = await db.user.findMany({
      where: {
        email,
        password,
      },
    });
    res.status(200).json(users[0]);
  }
}
