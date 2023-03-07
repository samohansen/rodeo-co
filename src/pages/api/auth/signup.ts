// import { PrismaClient } from '@prisma/client';
// import { hash } from 'bcryptjs';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
// try {
// // only post method is accepted
// if (req.method !== 'POST') {
// return res.status(405).json({ message: 'HTTP method not valid only POST Accepted' });
// }

// if (!req.body) {
//   return res.status(404).json({ error: "Don't have form data...!" });
// }

// const { username, email, password } = req.body;

// // check duplicate users
// const checkexisting = await prisma.user.findUnique({
//   where: {
//     email,
//   },
// });

// if (checkexisting) {
//   return res.status(422).json({ message: 'User Already Exists...!' });
// }

// // hash password
// const hashedPassword = await hash(password, 12);
// const newUser = await prisma.user.create({
//   data: {
//     username,
//     email,
//     password: hashedPassword,
//   },
// });

// res.status(201).json({ status: true, user: newUser });
// } catch (error) {
// console.error(error);
// res.status(500).json({ message: 'Something went wrong' });
// }
// }

// empty export statement (temporary)
export {};