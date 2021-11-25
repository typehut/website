import { NextPage } from "next";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import type { ParsedUrlQuery } from "querystring";

// <AvoidPurge text-primary-50 bg-primary-900 />

const NAV_COLOR = {
  text: "primary-50",
  bg: "primary-900",
  whiteLogo: true,
};
const NAV_WAYPOINT = 64;

export interface ExampleParams extends ParsedUrlQuery {}

export interface ExampleProps {}

const Example: NextPage<ExampleProps> = ({}) => {
  return (
    <>
      <Navbar theme={NAV_COLOR} waypoint={NAV_WAYPOINT} />
      {/* <Header className="bg-primary-900 text-primary-50">
        <div className="container mx-auto py-12">
          <h1>Hello</h1>
        </div>
      </Header> */}
      <dl className="flex flex-wrap max-w-4xl mx-auto">
        <dt className="w-1/12">xs</dt>
        <dd className="w-11/12 text-xs mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">sm</dt>
        <dd className="w-11/12 text-sm mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">base</dt>
        <dd className="w-11/12 text-base mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">lg</dt>
        <dd className="w-11/12 text-lg mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">xl</dt>
        <dd className="w-11/12 text-xl mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">2xl</dt>
        <dd className="w-11/12 text-2xl mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">3xl</dt>
        <dd className="w-11/12 text-3xl mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">4xl</dt>
        <dd className="w-11/12 text-4xl mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">5xl</dt>
        <dd className="w-11/12 text-5xl mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">6xl</dt>
        <dd className="w-11/12 text-6xl mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">7xl</dt>
        <dd className="w-11/12 text-7xl mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">8xl</dt>
        <dd className="w-11/12 text-8xl mb-8">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
        <dt className="w-1/12">9xl</dt>
        <dd className="w-11/12 text-9xl">
          あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
        </dd>
      </dl>
    </>
  );
};

export default Example;