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
