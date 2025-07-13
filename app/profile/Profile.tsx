/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { FC, useState,useEffect } from "react";
import SideBarProfile from "./sideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../components/Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};
const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses,setCourses] = useState([]);
  const {data,isLoading} = useGetUsersAllCoursesQuery(undefined,{});
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(()=> {
    if(data){
      const filteredCourses = user.courses
      .map((userCourse:any)=>
         data.courses.find((course:any)=> course._id === userCourse._id)
      )
      .filter((course:any)=> course !== undefined);
      setCourses(filteredCourses);
      
    
    }
  },[data,user])

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] bg-white dark:bg-slate-900 bg-opacity-90 border border-[#ffffff16] dark:border-[#ffffff1d] rounded-[5px] shadow-lg dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        ></SideBarProfile>
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
            <ProfileInfo avatar={avatar} user={user}></ProfileInfo>
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
           <ChangePassword></ChangePassword>
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] ">
            {courses && 
            courses.map((item:any,index:number)=> (
              <CourseCard item={item} key={index} user={user} isProfile={true} />
            ))
              
            }

          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins">
              You don't have any purchased Course!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
