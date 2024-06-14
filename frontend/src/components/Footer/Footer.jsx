
import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {RiLinkedinFill} from 'react-icons/ri';
import {AiFillYoutube, AiFillGithub, AiOutlineInstagram} from 'react-icons/ri';


const socialLinks = [
  {
    path:"https://www.youtube.com/",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5"/>
  },
  {
    path:"https://www.youtube.com/",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5"/>
  },
  {
    path:"https://www.youtube.com/",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5"/>
  },
  {
    path:"https://www.youtube.com/",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5"/>
  },

];

const quickLinks01 = [
  {
    path:"/home",
    display:"Home"
  },
  {
    path:"/",
    display:"About Us"
  },
  {
    path:"/",
    display:"Services"
  },
  {
    path:"/",
    display:"Blog"
  },
];

const quickLinks02 = [
  {
    path:"/find-a-doctor",
    display:"Find a Doctor"
  },
  {
    path:"/",
    display:"Request an Appointment"
  },
  {
    path:"/",
    display:"Find a Location"
  },
  {
    path:"/",
    display:"Get an Opinion"
  },
];


const quickLinks03 = [
  {
    path:"/",
    display:"Donate"
  },
  {
    path:"/contact",
    display:"Contact Us"
  },
];


const Footer = () => {

  const year = new Date().getFullYear();

  return (
  <footer className="pb-16 pt-10">
    <div className="container">
      <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
        <div>
          <img src ={logo} alt=""/>
          <p className="text-[16px] leading-7 font-[400] text-textColor">
            Copyright @ {year} developed as a community service
          </p>
        </div>
      </div>
    </div>
  </footer>
    
  )
};

export default Footer