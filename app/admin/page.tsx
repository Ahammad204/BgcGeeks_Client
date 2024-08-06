"use client";

import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="BGC GEEKS - Admin"
          description="BGC GEEKS is platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        ></Heading>

        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar></AdminSidebar>
          </div>
          <div className="w-[85%]"></div>
        </div>
        
      </AdminProtected>
    </div>
  );
};

export default page;
