import prisma from 'src/prisma';
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req })

  if (req.method === 'GET' ) {
    try {
      const user = await prisma.user.findUnique({
        where: {id: token.sub},
      })
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({message: "Couldn't find the user"})
    }
  }
  else if (req.method === 'PATCH') {
    try {
      const user = await prisma.user.update({
        where: {id: token.sub},
        data: req.body,
      })
      res.status(200).json({
        user: user,
        token: token
      });
    } catch (err) {
      res.status(500).json({message: "Couldn't update the user"})
    }
  }
  else {
    res.setHeader('Allow', ['GET', 'PATCH']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
