import React, { FC, useEffect, useState } from "react";
import UsersAnalytics from "../Analytics/UsersAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 90 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open, value }) => {

  const [ordersComparePercentage,setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage,setUserComparePercentage] = useState<any>();

  const {data,isLoading} = useGetUsersAnalyticsQuery({});
  const {data:ordersData, isLoading:ordersLoading} = useGetOrdersAnalyticsQuery({});

  useEffect(()=> {
    if(isLoading && ordersLoading){
      return;
    }else{
      if(data && ordersData){
        
        const usersLastTwoMonths = data.Users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if(usersLastTwoMonths.length === 2 &&
        ordersLastTwoMonths.length === 2 ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          // const usersPercentChange = ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *100;
          // const ordersPercentChange= ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100;
          let usersPercentChange = 0;
let ordersPercentChange = 0;

if (usersPreviousMonth === 0) {
  usersPercentChange = usersCurrentMonth === 0 ? 0 : 100;
} else {
  usersPercentChange = ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100;
}

if (ordersPreviousMonth === 0) {
  ordersPercentChange = ordersCurrentMonth === 0 ? 0 : 100;
} else {
  ordersPercentChange = ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100;
}


          setUserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentageChange: usersPercentChange
          });
          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentageChange: ordersPercentChange
          });
        }
      }
    }
  },[data, isLoading, ordersData, ordersLoading]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UsersAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {ordersComparePercentage?.currentMonth}
                </h5>
                <h5
                  className="py-2 font-Poppins dark:text-[#45CBA0] text-black
                 text-[20px] font-[400]"
                >
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={
                  ordersComparePercentage?.percentageChange > 0 ? 100 : 0
                } open={open} />
                <h5 className="text-center dark:text-[#fff] text-black pt-4">
                     {
                    ordersComparePercentage?.percentageChange > 0 ? '+' + ordersComparePercentage?.percentageChange.toFixed(2): '-' + ordersComparePercentage?.percentageChange.toFixed(2)

                  } %
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5
                  className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] 
                font-[400]"
                >
                  New Users -- In this month
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={
                  userComparePercentage?.percentageChange > 0 ? 100 : 0
                } open={open} />
                <h5 className="text-center dark:text-[#fff] text-black pt-4">
                  {
                    userComparePercentage?.percentageChange > 0 ? '+' + userComparePercentage?.percentageChange.toFixed(2): '-' + userComparePercentage?.percentageChange.toFixed(2)

                  } %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[65%,35%] mt-[-20px] ">
        <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
            <OrdersAnalytics isDashboard={true}/>

        </div>
        <div className="p-5">
            <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
        Recent Transactions
            </h5>
            <AllInvoices isDashboard={true}/>

        </div>

      </div>
    </div>
  );
};

export default DashboardWidgets;
