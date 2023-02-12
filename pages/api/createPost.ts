// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { title } from "process";

type PostProps = {
   title: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   try {
      //get prisma to fetch the posts
      const post: PostProps = JSON.parse(req.body);
      if (req.method === "POST") {
         if (!post.title.length) {
            return res.status(500).json({ message: "Please do not leave this empty" });
         }
         try {
            const data = await prisma.post.create({
               data: {
                  title: post.title,
               },
            });
            res.status(200).json(data);
         } catch (error) {
            return res.status(500).json({ message: "Error creating a new post" });
         }
      }
   } catch (error) {
      return res.status(500).json(error);
   }
}
