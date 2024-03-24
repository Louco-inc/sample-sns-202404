import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "PATCH") {
    const id = req.query.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const updatedComment = await db.comment.update({
      where: {
        id: Number(id),
      },
      data: {
        content: body.content,
      },
      include: {
        user: true,
        post: true,
        commentFavorites: true,
      },
    });
    const responseData = {
      ...updatedComment,
      favorites: updatedComment.commentFavorites,
    };
    res.status(200).json(responseData);
  } else if (req.method === "DELETE") {
    const id = req.query.id;
    await db.comment.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ status: "success" });
  }
}
