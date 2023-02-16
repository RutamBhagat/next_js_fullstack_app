// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if(req.method === "GET"){
    try {
      //get prisma to fetch the posts
      const data = await prisma.post.findMany({
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc"
        }
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({error: "Error fetching posts"})
    }
   }
}
