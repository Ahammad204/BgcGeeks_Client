/* eslint-disable @next/next/no-img-element */
import { styles } from "@/app/styles/style";
import { useEditLayoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data,refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout,{isLoading,isSuccess,error}] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
        refetch();
        toast.success("Hero updated successfully");
       
      }
      if (error) {
        if ("data" in error) {
          const errorMessage = error as any;
          toast.error(errorMessage.data.message);
        }}
  }, [data, error, isSuccess, refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if(file){
        const reader = new FileReader();
        reader.onload = (e:any) => {
            if(reader.readyState === 2) {
                setImage(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    }
  };
  const handleEdit = async(e: any) => {
    await editLayout({
        type:"Banner",
        image,
        title,
        subTitle
    })
  };

  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div className="absolute top-[70px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]"></div>
        <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-start pt-[70px] 1000px:pt-[0] z-10">
          <div className="relative flex items-center justify-end">
            <img
              src={image}
              alt=""
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
            />
            <input
              type="file"
              name=""
              id="banner"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label htmlFor="banner" className="absolute bottom-0 right-20 z-20">
              <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
            </label>
          </div>
          <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px] ">
    
            <textarea
              className="dark:text-white resize-none text-[#000000c7] text-[30px] px-4 py-2 w-full 1000px:text-[60px] 1500px:text-[70px] font-[600] bg-transparent border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#42d383] rounded-lg transition-all border-none"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={3}
            ></textarea>
            <br />
      
            <textarea
              className="dark:text-white resize-none text-[#000000c7] text-[18px] px-4 py-2 w-full 1000px:text-[35px] 1500px:text-[45px] font-[100] bg-transparent border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#42d383] rounded-lg transition-all border-none scrollbar-hide"
              placeholder="Enter subTitle"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              rows={3}
            ></textarea>
            <br />
            <br />
            <br />
            
            <div

    className={`${
        styles.button
      } !w-[120px] !min-h-[40px] dark:text-white text-black ${
        data?.layout?.banner?.title !== title ||
        data?.layout?.banner?.subTitle !== subTitle ||
        data?.layout?.banner?.image !== image
          ? "!cursor-pointer !bg-[#42d383]"
          : "!cursor-not-allowed"
      } rounded-lg absolute bottom-12 right-12 flex items-center justify-center transition-all`}
              onClick={
                data?.layout?.banner?.title !== title ||
                data?.layout?.banner?.subTitle !== subTitle ||
                data?.layout?.banner?.image !== image
                  ? handleEdit
                  : () => null
              }
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
