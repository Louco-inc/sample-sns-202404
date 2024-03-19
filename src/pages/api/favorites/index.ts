import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const { postId, userId } = body;
    const newFavorite = await db.favorite.create({
      data: {
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: true,
        post: true,
      },
    });
    res.status(200).json(newFavorite);
  } else if (req.method === "DELETE") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const { postId, userId } = body;
    await db.favorite.deleteMany({
      where: {
        postId,
        userId,
      },
    });
    res.status(200).json({status: "success"});
  }
}
