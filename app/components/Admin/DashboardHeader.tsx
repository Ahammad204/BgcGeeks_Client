"use client";
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from "@/redux/features/notifications/notificationsApi";
import { ThemeSwitcher } from "../../../app/utils/ThemeSwitcher";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT,{transports: ["websocket"]});

type Props = {
  open?:boolean;
  setOpen?:any;
};

const DashboardHeader: FC<Props> = ({open, setOpen}) => {
 
  const {data,refetch} = useGetAllNotificationsQuery(undefined,{
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus,{isSuccess}] = useUpdateNotificationStatusMutation();
  const [notifications,setNotifications] = useState<any>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dq05rh729/video/upload/v1752332485/notification-18-270129_vixmum.mp3"
    )
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const playerNotificationSound = () => {
    audio.play();
  }

  useEffect(()=> {
    if(data){
      setNotifications(
        data.notifications.filter((item:any)=> item.status === "unread")
      );
    }
    if(isSuccess){
      refetch();
    }
    audio.load();
  },[audio, data, isSuccess, refetch]);

  useEffect(()=> {
    socketId.on("newNotification",(data)=> {
      refetch();
      playerNotificationSound();
    })
  },[playerNotificationSound, refetch]);

  const handleNotificationStatusChange = async(id: string) => {
    await updateNotificationStatus(id);
  }


  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white
         text-black"></IoMdNotificationsOutline>
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] overflow-y-scroll py-3 px-2 border-[#ffffff0c] dark:border[#111c43] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 z-[50] rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
         {notifications && notifications.map((item:any,index:number)=> (
      
          <div key={index} className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                {item.title}
              </p>
              <p className="text-black dark:text-white cursor-pointer"
              onClick={()=> handleNotificationStatusChange(item._id)}
              >
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
             {item.message}
            </p>
            <p className="p-2 text-black dark:text-white text-[14px]">
              {format(item.createdAt)};
            </p>
          </div>
         ) )}
          
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
