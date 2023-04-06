import prisma from 'src/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({message: 'HTTP method not valid - only POST Accepted'});
  }
  if (!req.body) {
    return res.status(404).json({error: "Don't have form data."});
  }

  const {username, email, password, userType} = req.body;
  const checkExisting = await prisma.user.findUnique({
    where: {email},
  });
  if (checkExisting) {
    return res.status(422).json({message: 'Email already exists'});
  }

  const hashedPassword = await hash(password, 12);
  const newUser = await prisma.user.create({
    data: {
      name: username,
      email: email,
      password: hashedPassword,
      type: userType,
    }
  });
  
  res.status(201).json({status: true, user: newUser});
}
