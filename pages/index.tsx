import { GetStaticProps } from "next";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Header from "@/components/base/Header";
import Navbar from "@/components/base/Navbar";
import { NavbarColors } from "@/components/base/Navbar/Navbar.types";
import * as PostAPI from "@/lib/api/post";
import { Unpacked } from "@/lib/types/misc";
import styles from "@/styles/Home.module.css";

import type { ParsedUrlQuery } from "querystring";

// <AvoidPurge text-current bg-transparent text-primary-50 bg-primary-900 var-white />

const NAV_COLORS: NavbarColors = {
  text: "primary-50",
  bg: "transparent",
  logo: "white",
  textScrolled: "primary-50",
  bgScrolled: "primary-900",
};
const NAV_WAYPOINT = 64;

export interface HomeParams extends ParsedUrlQuery {}

export interface HomeProps {
  posts: Unpacked<ReturnType<typeof PostAPI.all>>;
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <>
      <Navbar colors={NAV_COLORS} waypoint={NAV_WAYPOINT} />
      <Header className="bg-primary-900 text-primary-50">
        <div className="container mx-auto py-12">
          <h1>Hello</h1>
        </div>
      </Header>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.tsx</code>
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>

          <div>
            {posts.map((post) => (
              <article key={post.pid}>{post.meta.title}</article>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

const getStaticProps: GetStaticProps<HomeProps, HomeParams> = async ({
  params,
}) => {
  const posts = await PostAPI.all();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
export { getStaticProps };
