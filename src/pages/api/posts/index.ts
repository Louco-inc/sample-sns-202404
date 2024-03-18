import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        comments: true,
        favorites: true,
      },
    });
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const { content, userId } = body;
    const post = await db.post.create({
      data: {
        content,
        user: {
          connect: { id: userId },
        },
        comments: {
          create: [],
        },
        favorites: {
          create: [],
        },
      },
      include: {
        user: true,
        comments: true,
        favorites: true,
      },
    });
    res.status(200).json(post);
  }
}
