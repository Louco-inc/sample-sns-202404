import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const id = req.query.id;
    const post = await db.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(post);
  } else if (req.method === "PATCH") {
    const id = req.query.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const body = JSON.parse(req.body);
    const updatedPost = await db.post.update({
      where: {
        id: Number(id),
      },
      data: {
        content: body.content,
      },
      include: {
        user: true,
        comments: true,
        favorites: true,
      },
    });
    res.status(200).json(updatedPost);
  } else if (req.method === "DELETE") {
    const id = req.query.id;
    const post = await db.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(post);
  }
}
