import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from '../components/Sidebar'

import { useStateContext } from "../../context";
import { AxAdminDashCard, DisplayCampaigns, ResponsiveDrawer,  } from "../components";
import { Loader} from "../../components";



import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { PieChart } from '@mui/x-charts/PieChart';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
  const navigate = useNavigate();
  const { address, contract, getCampaigns, getDonations, getCampaignsCount, getWhitelistersCount } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [donators, setDonators] = useState(0);
  const [amount, setAmount] = useState(0);
  const [pieChartData, setPieChartData] = useState([]);
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [whitelistersCount, setWhitelistersCount] = useState(0);


  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    const count = await getCampaignsCount();
    const whitelisters = await getWhitelistersCount();
    setCampaigns(data);
    setCampaignsCount(count);
    setWhitelistersCount(whitelisters);
    setIsLoading(false);
  };


  useEffect(() => {
    if (contract){
     const fetchData = async () => {
      await fetchCampaigns();
      await fetchDonatorsCount();
    };
    fetchData();
    } 
  }, [address, contract,campaignsCount]);


    const fetchDonatorsCount = async () => {
try
  {    let counts = 0;
      let amountCollectd = 0;

      for(let i=0; i<=campaigns.length; i++){
      const data = await getDonations(i);
      counts += data.length;

      data.forEach(donation => {
        amountCollectd += parseFloat(donation.donation);
      
      })
      }
      setDonators(counts);
      setAmount(amountCollectd);

      const pieData = [
        {id:0, value: (campaignsCount*10).toString(), label: 'Campaigns'},
        {id:1, value: donators*10, label: 'Donators'},
        {id:2, value: amount*10, label: 'Amount Raised'},
        {id:3, value: (whitelistersCount*10).toString(), label: 'NPOs'}
      ];
      setPieChartData(pieData)

    } catch (error) {
      console.error('error', error);
    }
    }

 

    const activeCampaigns = campaigns.filter(campaign => campaign.isActive);

  return (
    <div className='flex flex-row'>
    
        <ResponsiveDrawer />
    
    <div className='w-full bg-[#ffffff]'>
        <h2 className='font-epilogue ml-3 mt-3 font-semibold text-[20px] text-[#474747]'>Campaigns</h2>
        
        <div className='flex mt-10 justify-evenly'>
        
     
        <AxAdminDashCard
        title="Campaigns"
        value={activeCampaigns.length.toString()}
        />
        <AxAdminDashCard
        title="Donators"
        value={donators}
        />
        <AxAdminDashCard
        title="Raised"
        value={amount}
        />
        <AxAdminDashCard
        title="NPOs"
        value={whitelistersCount.toString()}
        />
         
        </div>
        <div className="flex justify-center mt-20">
          {pieChartData.length > 0 ?
        <PieChart
      series={[{ data: pieChartData}]}
      width={500}
      height={250}
    /> : 
    <CircularProgress color="inherit" />

  }
        </div>
    </div>
    
    </div>
  )
}

export default Dashboard