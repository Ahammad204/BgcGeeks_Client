import React, { FC } from "react";

interface HeadProps {
  title: string;
  description: string;
  keywords: string;
}
export const metadata ={
  icons:{
    icon:['favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.png']
  }
}

const Heading: FC<HeadProps> = ({ title, description, keywords }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      

      
    </>
  );
};

export default Heading;
