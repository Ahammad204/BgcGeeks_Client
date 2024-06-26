"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="BGC Geeks"
        description="BGCGeeks is a platform for students to learn and get help from from teachers"
        keywords="Programming,MERN,Redux,Cyber Security"
      ></Heading>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      ></Header>
      <Hero></Hero>
    </div>
  );
};

export default Page;
