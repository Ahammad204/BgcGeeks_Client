import Image from "next/image";
import { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};
const Hero: FC<Props> = (props) => {
  return (
    <div className="w-full mb-4 flex md:flex-row flex-col items-center hero_animation">
      <div className="2xl:w-[40%] flex 2xl:min-h-screen items-center justify-end pt-[70px] 2xl:pt-[0] z-10 ">
        <Image
          src={require("../../../public/assets/banner.png")}
          alt=""
          className="max-w-[90%] w-[90%] xl:max-w-[85%] h-[auto] z-[10]"
        ></Image>
      </div>
      <div className="2xl:w-[60%] flex flex-col items-center 2xl:mt-[0px] text-center 2xl:text-left mt-[150px] ">
        <h2 className="text-[#000000c7]  text-[30px] px-3 w-full font-[600] font-Josefin py-2  dark:text-white 2xl:text-[70px] 2xl:leading-[75px] ">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] xl:!w-[55%] 2xl:!w-[78%]">
          We Have 48k+ Online Courses & 500k+ Online registered student, Find
          your desired Courses from them.
        </p>
        <br />
        <br />
        <div className="xl:w-[55%] 2xl:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            placeholder="Search Courses..."
            className="bg-transparent text-[20px] font-[500] font-Josefin border rounded-[5px] p-2 w-full h-full outline-none text-[#0000004c] dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd]  dark:text-[#ffffffe6] "
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={30}></BiSearch>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Hero;
