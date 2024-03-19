import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const { postId, userId, content } = body;
    const newComment = await db.comment.create({
      data: {
        content,
        post: {
          connect: { id: postId },
        },
        user: {
          connect: { id: userId },
        },
        commentFavorites: {
          create: [],
        },
      },
      include: {
        user: true,
        post: true,
        commentFavorites: true,
      },
    });
    res
      .status(200)
      .json({ ...newComment, favorites: newComment.commentFavorites });
  } else if (req.method === "DELETE") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const { id } = body;
    await db.comment.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ status: "success" });
  }
}
