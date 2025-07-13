'use client'
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from './About';

type Props = {};

const Page = (props: Props) => {
    const [open,setOpen] = useState(false);
    const [activeItem,setActiveItem] = useState(2);
    const [route,setRoute] = useState("Login");
    
  return (
    <div>
        <Heading 
        title="About us - BGC Geeks"
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
        <About/>
        <Footer></Footer>
    </div>
  );
};

export default Page;