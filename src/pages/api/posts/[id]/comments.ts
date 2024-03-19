import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const id = req.query.id;
    const comments = await db.comment.findMany({
      where: {
        postId: Number(id),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        post: true,
        commentFavorites: true,
      },
    });
    const extractedComments = comments.map((comment) => ({
      ...comment,
      favorites: comment.commentFavorites,
    }));
    res.status(200).json(extractedComments);
  }
}
