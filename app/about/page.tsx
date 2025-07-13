'use client'
import React, { useState } from 'react';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import About from './about';
import Footer from '../components/Footer';

type Props = {};

const page = (props: Props) => {
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

export default page;