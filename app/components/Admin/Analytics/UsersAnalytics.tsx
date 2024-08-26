import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";

type Props = {
    isDashboard?:boolean;
};

//   const analyticsData = [
//     { name: "Jun 2023", count: 300 },
//     { name: "July 2023", count: 200 },
//     { name: "August 2023", count: 500 },
//     { name: "Sept 2023", count: 700 },
//     { name: "October 2023", count: 200 },
//     { name: "Nov 2023", count: 500 },
//     { name: "December 2023", count: 700 },
//   ];


const UsersAnalytics = ({isDashboard}:Props) => {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});
    const analyticsData:any = [];

    data && 
    data.Users.last12Months.forEach((item:any)=> {
        analyticsData.push({name:item.month,count:item.count});
    });

  return (
    <>
    {
        isLoading ? (
            <Loader/>
        ):(
            <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
            <div className={`${isDashboard ? "!ml-8 mb-5": ''}`}>
            <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
            Users Analytics
            </h1>
            {
                !isDashboard && (
                    <p className={`${styles.label} px-5`}>
                    Last 12 months analytics data{" "}
                    </p>
                )
            }

            </div>

            <div className={`w-full ${isDashboard ? 'h-[30vh]':'h-screen'} flex items-center justify-center`}>
            <ResponsiveContainer width={isDashboard ? '100%':'90%'} height={!isDashboard ? "50%" : "100%"}>
            <AreaChart 
            data={analyticsData}
            margin={{
                top:20,
                right:30,
                left:0,
                bottom:0
            }}
            >
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Area
            type="monotone"
            dataKey="count"
            stroke="#4d62d9"
            fill="#4d62d9"
            />
            </AreaChart>
            </ResponsiveContainer>
            </div>
            </div>
        )
    }
    </>
  );
};

export default UsersAnalytics;