import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    // Check the HTTP method and if we have a body
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'HTTP method not valid - only POST Accepted'});
      }
    if (!req.body) {
    return res.status(404).json({error: "Don't have form data."});
    }

    // Get the data from the body (just name and type for now)
    const {email, name, type} = req.body;

    if (!type || type === '' || !email) {
        return res.status(422).json({message: 'User type or email is missing'});
    }
    let data;
    if (name) {
        data = {
            name: name,
            type: type,
        }
    }
    else {
        data = {
            type: type,
        }
    }
    const updateUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: data,
    })

    res.status(201).json(updateUser);

}

    