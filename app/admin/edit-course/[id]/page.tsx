'use client'
import DashboardHeader from '../../../components/Admin/DashboardHeader';
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar';
import Heading from '../../../utils/Heading';
import React from 'react';
import EditCourse from '../../Course/EditCourse';

type Props = {};

const page = ({params}:any) => {

  const id = params?.id

  return (
    <div>
        <Heading
         title="BGC GEEKS - Admin"
         description="BGC GEEKS is platform for students to learn and get help from teachers"
         keywords="Programming,MERN,Redux,Machine Learning"
        />

        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar></AdminSidebar>
            </div>
            <div className='w-[85%]'>
            <DashboardHeader/>
            <EditCourse id={id}/>
            </div>
        </div>
    </div>
  );
};


export default page;