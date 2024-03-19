import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const { commentId, userId } = body;
    const newComment = await db.commentFavorite.create({
      data: {
        comment: {
          connect: { id: commentId },
        },
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: true,
        comment: true,
      },
    });
    res.status(200).json(newComment);
  } else if (req.method === "DELETE") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const { commentId, userId } = body;
    await db.commentFavorite.deleteMany({
      where: {
        commentId,
        userId,
      },
    });
    res.status(200).json({ status: "success" });
  }
}
