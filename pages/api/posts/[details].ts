// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Get auth users posts
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details as string,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(403).json({ err: "Error occured while getting auth users posts" });
    }
  }
}
