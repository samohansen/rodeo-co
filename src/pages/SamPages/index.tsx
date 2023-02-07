// pages/index.tsx
import React from "react"
import { GetStaticProps } from "next"
import Layout from "src/SamComponents/Layout"
import Post, { PostProps } from "src/SamComponents/Post"
import prisma from 'src/prisma';

type Props = {
  feed: PostProps[]
}

// Using the Prisma ORM to fetch data from the database (wow, that's amazing!)
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>🐎 Upcoming Rodeos</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
