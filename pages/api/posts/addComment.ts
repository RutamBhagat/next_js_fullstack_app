// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        message: "Please sign in",
      });
    }

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      },
    });

    // Add a comment
    try {
      const { title, postId } = req.body.data;

      if (!title.length || !postId) {
        return res.status(401).json({ err: "Please provide a title and postId", message: "Please enter a message" });
      }
      const result = await prisma.comment.create({
        data: {
          message: title,
          userId: prismaUser?.id as string,
          postId: postId,
        },
      });
      return res.status(200).json({ message: "Comment added", result });
    } catch (error) {
      return res.status(403).json({ err: "Error occured while getting auth users posts" });
    }
  }
}
