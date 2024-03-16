import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "GET") {
    const uuid = req.query.uuid;
    const user = await db.user.findMany({
      where: {
        uuid,
      },
    });
    res.status(200).json(user[0]);
  }
}
