'use client'
import Heading from '../../../app/utils/Heading';
import AdminProtected from '../../../app/hooks/adminProtected';
import React from 'react';
import AdminSidebar from '../../../app/components/Admin/sidebar/AdminSidebar';
import DashboardHero from '../../../app/components/Admin/DashboardHero';
import AllUsers from '@/app/components/Admin/Users/AllUsers';


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

        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar></AdminSidebar>
          </div>
          <div className="w-[85%]">
            <DashboardHero></DashboardHero>
            <AllUsers/>
          </div>
        </div>
        
      </AdminProtected>
    </div>
  );
};

export default page;