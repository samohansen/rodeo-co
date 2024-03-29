This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Also, [Prisma](https://www.prisma.io/docs/getting-started) for the database/ORM

##

## Getting Started

First, install the project and run the development server:

```bash
git clone https://github.com/samohansen/rodeo.git

npm install

npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
(Set up a database connection in .env?)

## Prisma

Run `npx prisma studio` and open [http://localhost:5555](http://localhost:5555) to interact with the database

`npx prisma db seed` to seed/reseed the db

`npx prisma db push --force-reset && npx prisma db seed` to reseed the db spicily

Important: You need to re-run the `prisma generate` command after every change that's made to your Prisma schema to update the generated Prisma Client code.
*(I am not sure when to use generate vs seed, look into it)

##

.

.

.

## 

## Next.js info

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
