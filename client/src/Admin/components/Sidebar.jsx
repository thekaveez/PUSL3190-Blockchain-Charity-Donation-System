import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { navlinks } from '../constants'

const Sidebar = () => {

    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("dashboard");
  return (
   
    <div className="flex flex-col justify-between top-5">

        


      <div className="flex flex-col justify-between">
        <h3 className="flex p-4 ml-[20px] font-epilogue font-semibold text-[20px]">ADMIN </h3>
         <ul className="flex flex-col">
        {navlinks.map((link) => (
          <li
            key={link.name}
            className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43'} cursor-pointer`}
            onClick={() => {       
                setIsActive(link.name);
                navigate(link.link);
              
            }}
          >
            <p className={`mx-[20px] font-epilogue font-semibold text-[14px] w-full h-[40px] text-center ${
                isActive === link.name ? 'bg-[#1dc071]' : 'text-[#e3eaec]'}`}>
                {link.name}
            </p>
            </li>
        ))}
        </ul>
   
        
      </div>
    </div>
  );
}

export default Sidebar