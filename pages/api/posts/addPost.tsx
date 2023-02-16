// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        message: "Please sign in to make a post",
      });
    }

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });

    // Check title
    const title: string = req.body.title;
    if (title.length > 300) {
      return res.status(403).json({ message: "Please Write a shorter post" });
    } 
    else if (!title.length) {
      return res
        .status(403)
        .json({ message: "Please do not leave this empty" });
    }

    // Create a post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser?.id,
        },
      });
      return res.status(200).json(result)
    } catch (error) {
      return res.status(403).json({err: "Error occured while creating a post"})
    }
  }
}
