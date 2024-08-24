'use client'
import CourseAnalytics from '@/app/components/Admin/Analytics/CourseAnalytics';
import DashboardHeader from '../../components/Admin/DashboardHeader';
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar';
import Heading from '../../utils/Heading';

type Props = {};

const page = (props: Props) => {
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
            <CourseAnalytics/>
            </div>
        </div>
    </div>
  );
};


export default page;