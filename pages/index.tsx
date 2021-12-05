// import Head from "next/head";
// import Image from "next/image";
import * as React from "react";

import { Header } from "@/components/base/Header";
import { Navbar } from "@/components/base/Navbar";
import * as PostAPI from "@/lib/api/post";

import type { NextPage } from "next";
import type { GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { NavbarTheme } from "@/components/base/Navbar/Navbar.types";
import type { Waypoint } from "@/lib/hooks/useWaypoint";
import type { Unpacked } from "@/lib/types/misc";

import styles from "@/styles/Home.module.css";

// <AvoidPurge text-current bg-transparent text-primary-50 bg-primary-900 var-white var-primary-50 />

export type HomeParams = ParsedUrlQuery;

export interface HomeProps {
  posts: Unpacked<ReturnType<typeof PostAPI.all>>;
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const [navTheme, setNavTheme] = React.useState<NavbarTheme>({
    textColor: "primary-50",
    bgColor: "transparent",
    logoColor: "white",
    shadow: false,
  });
  const ref1 = React.useRef<HTMLDivElement>(null);
  const ref2 = React.useRef<HTMLDivElement>(null);
  const ref3 = React.useRef<HTMLDivElement>(null);

  const waypoints: Waypoint[] = [
    {
      y: 64,
      handler: (isBelow) => {
        setNavTheme({
          textColor: "primary-50",
          bgColor: isBelow ? "primary-900" : "transparent",
          logoColor: "white",
          shadow: isBelow,
        });
      },
    },
    {
      ref: ref1,
      handler: (isBelow) => {
        setNavTheme({
          textColor: isBelow ? "primary-900" : "primary-50",
          bgColor: isBelow ? "white" : "transparent",
          logoColor: isBelow ? "primary-900" : "white",
          shadow: !isBelow,
        });
      },
    },
    {
      ref: ref2,
      handler: (isBelow) => {
        setNavTheme({
          textColor: isBelow ? "primary-50" : "primary-900",
          bgColor: isBelow ? "primary-900" : "white",
          logoColor: isBelow ? "primary-50" : "white",
          shadow: isBelow,
        });
      },
    },
    {
      ref: ref3,
      handler: (isBelow) => {
        setNavTheme({
          textColor: isBelow ? "primary-900" : "primary-50",
          bgColor: isBelow ? "white" : "primary-900",
          logoColor: isBelow ? "primary-900" : "primary-50",
          shadow: !isBelow,
        });
      },
    },
  ];

  return (
    <>
      <Navbar theme={navTheme} waypoints={waypoints} />
      <Header className="bg-primary-900 text-primary-50">
        <div className="container mx-auto py-12">
          <h1>Hello</h1>
        </div>
      </Header>
      <div ref={ref1} className="h-screen bg-primary-500"></div>
      <div ref={ref2} className="h-screen bg-primary-400"></div>
      <div ref={ref3} className="h-screen bg-primary-300"></div>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing
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

const getStaticProps: GetStaticProps<HomeProps, HomeParams> = async (
  {
    // params,
  }
) => {
  const posts = await PostAPI.all();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
export { getStaticProps };
