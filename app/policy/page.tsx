'use client'
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Policy from './Policy';

type Props = {};

const Page = (props: Props) => {
    const [open,setOpen] = useState(false);
    const [activeItem,setActiveItem] = useState(3);
    const [route,setRoute] = useState("Login");
    
  return (
    <div>
        <Heading 
        title="Policy - BGC Geeks"
        description= "Elearning is learning managment system for helping programmers."
        keywords='programming,mern'
        />
        <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
        />
       <Policy></Policy>
        <Footer></Footer>
    </div>
  );
};

export default Page;