import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react';
import ReviewCard from '../Review/ReviewCard';

type Props = {};

export const reviews = [
    {
        name:"Kazi Ahammad Ullah",
        avatar:"https://i.ibb.co/HgjVLqc/profile-pic-1.png",
        profession:"Student || BGC Trust University Bangladesh",
        ratings: 5,
        comment: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name:"Md Tahmidul Alam Ahad",
        avatar:"https://i.ibb.co/HgjVLqc/profile-pic-1.png",
        ratings: 5,
        profession:"Student || BGC Trust University Bangladesh",
        comment: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name:"A",
        avatar:"https://i.ibb.co/HgjVLqc/profile-pic-1.png",
        ratings: 5,
        profession:"Student || BGC Trust University Bangladesh",
        comment: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }]

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
        <div className="w-full 800px:flex items-center">
            <div className="800px:w-[50%] w-full">
                <Image
                src={require("../../../public/Reviews/file.png")}
                alt="business"
                width={700}
                height={700}
                />

            </div>
            <div className="800px:w-[50%] w-full">
            <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br/> See What They Say About Us
            </h3>
            <br/>
            <p className={styles.label}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
            </p>
            </div>
            <br/>
            <br/>
           

        </div>
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 ">
        {/* md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px] */}
            {reviews && 
                reviews.map((i,index)=> <ReviewCard item={i} key={index}/>)}
            </div>

    </div>
  );
};

export default Reviews;