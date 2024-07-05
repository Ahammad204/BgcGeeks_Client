'use client'
import React, { FC } from "react";

type Props = {};
const Profile:FC<Props> = (props: Props) => {
    const [scroll,setScroll] = useState(false);
    
    if(typeof window !== "undefined"){
        window.addEvenListener ("scroll",()=> {
            if(window.scrolly > 85 ){
                setScroll(true);

            }else{
                setScroll(false);
            }
        })
    }

  return ( 
  <div className="w-[85%] flex mx-auto">
    <div
    className={`w-[60px] 800px:w-[310px] h-[450px] bg-slate-900 bg-opacity-90 border border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}

    ></div>
     </div>
     )
};

export default Profile;
