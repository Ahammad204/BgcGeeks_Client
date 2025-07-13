/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

type Props = {};

const page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} Profile`}
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
        <Profile user={user}></Profile>
        <Footer/>
      </Protected>
    </div>
  );
};

export default page;
