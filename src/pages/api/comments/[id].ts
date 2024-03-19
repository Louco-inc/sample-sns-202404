import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "DELETE") {
    const id = req.query.id;
    await db.comment.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ status: "success" });
  }
}
