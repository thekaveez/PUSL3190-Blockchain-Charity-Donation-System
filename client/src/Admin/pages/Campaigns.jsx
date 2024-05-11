import React, { useState, useEffect } from "react";
import SideBar from '../components/Sidebar'

import { useStateContext } from "../../context";
import { DisplayCampaigns, ResponsiveDrawer } from "../components";

const Campaigns = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div className='flex flex-row'>
    
        <ResponsiveDrawer />
    
    <div className='w-full bg-[#ffffff]'>
        <h2 className='font-epilogue ml-3 mt-3 font-semibold text-[20px] text-[#474747]'>Campaigns</h2>
        <div className='mt-10'>
          
        </div>
        <DisplayCampaigns
      isLoading={isLoading}
      campaigns={campaigns}
    />
    </div>
    
    </div>
  )
}

export default Campaigns