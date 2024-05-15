import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, thirdweb} from "../assets";

import {navlinks} from "../constants"


const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
    return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && "bg-[#2c2f32]"
      }
      flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`} 
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
    );
  };

const Menu = ({isAdmin, address}) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("dashboard");

    const filteredNavLinks = isAdmin && address ? navlinks : navlinks.filter(link => link.name !== "Admin" && link.name !== "Create Campaign");


  return (
    <div className="flex justify-between items-center sticky top-5">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#e9faedfd]" imgUrl={logo} />
      </Link>

      <div className="flex flex-row justify-between items-center">
         <ul className="flex">
        {filteredNavLinks.map((link) => (
          <li
            key={link.name}
            className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43'} cursor-pointer`}
            onClick={() => {       
                setIsActive(link.name);
                navigate(link.link);
              
            }}
          >
            <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                {link.name}
            </p>
            </li>
        ))}
        </ul>
   
        
      </div>
    </div>
  );
};

export default Menu;
