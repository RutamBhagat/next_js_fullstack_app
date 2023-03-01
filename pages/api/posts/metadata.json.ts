// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = {
        name: "DragonRaidenShogun",
        symbol: "DRS",
        description:
          "Unleash the power of the DragonRaidenShogun with this Solflare NFT. Channeling the ferocity of a dragon, the lightning speed of a raiden, and the wisdom of a shogun, this token embodies the ultimate fusion of strength, agility, and strategy. Join the celebration of the Solflare X launch and add this NFT to your collection today!",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmuSu28XmFBGqZ4d1llHuYmZ0wH6Qzg2bR-Hd5XyA3fAXj90GLVzobpzP-IoVhDzpz3bE&usqp=CAU",
      };
      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while posting metadata" });
    }
  }
}
