/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { styles } from '../styles/style';

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">BGC Geeks?</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-poppins">
          Are you ready to take programming skills to the next level? Look no further than BGC GEEKS, the premier programming community dedicated to helping new programmers achieve their goals and reach their full potential.
          <br />
          <br />
          As the founder and CEO of BGC Geeks, I know the challenges that come with learning and growing in the programming industry. That's why I created BGC GEEKS to provide new programmers with the resources and support they need to succeed.
          <br />
          <br />
          Our mission is to empower individuals by offering high-quality learning materials, mentorship opportunities, and hands-on projects that build real-world experience.
          <br />
          <br />
          At BGC Geeks, we believe that consistent practice, community support, and access to the right tools can make anyone a successful developer — regardless of background or experience.
          <br />
          <br />
          Whether you're just getting started or looking to sharpen your skills, BGC Geeks is here to guide you every step of the way. Join our community, collaborate on exciting projects, and unlock your true potential as a developer.
        </p>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
