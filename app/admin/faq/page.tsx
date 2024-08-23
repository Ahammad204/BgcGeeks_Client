'use client'
import EditFaq from '../../../app/components/Admin/Customization/EditFaq';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import React from 'react';

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
          <EditFaq/>
        </div>
      </div>
      
    </AdminProtected>
  </div>
  );
};

export default page;