import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from '../components/Sidebar'

import { useStateContext } from "../../context";
import { DisplayCampaigns, DisplayUsers, ResponsiveDrawer } from "../components";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Users = () => {
  const navigate = useNavigate();
  const { address, contract, getCampaigns, setWhitelistAddress, getWhitelistedAddress, deleteWhitelistedAddress } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({
    whitelistAddress: ""
  });
 

  const [whitelisters, setWhitelisters] = useState([]);
 
  const handleFormFieldChange = (fieldName, e) => {

      setForm({ ...form, [fieldName]: e.target.value });
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
        setIsLoading(true);
        console.log(form);
        await setWhitelistAddress(
          {...form, 
            whitelistAddress: form.whitelistAddress, 
          }
        ); 
        setForm({whitelistAddress: ""});
        setIsLoading(false);
        navigate("/admin-users");
    };
  const handleDelete = async(address) => {
    e.preventDefault();  
        setIsLoading(true);
      await deleteWhitelistedAddress(address);
      setIsLoading(false);
      navigate("/admin-users");
    }

const fetchWhitelisters = async () =>{

  const arr = [];

  for(let i=0; i<=whitelisters.length; i++){
    const data = await getWhitelistedAddress(i);
    arr.push(data);
    }
    const formattedArray = arr.map((item, index) => ({id: index+1, value: item}));
  return formattedArray;
}


console.log(whitelisters);
console.log(whitelisters.length);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (contract) {
        
        const fetchedWhitelisters = await fetchWhitelisters();
        const data = await fetchCampaigns();
        setWhitelisters(fetchedWhitelisters);
        setCampaigns(data);
      }
    };

    fetchData();
    setIsLoading(false);
    // 
  }, [address, contract, whitelisters]);


  return (
    <div className='flex flex-row'>
    
        <ResponsiveDrawer />
    
    <div className='w-full bg-[#ffffff]'>
        <h2 className='font-epilogue ml-3 mt-3 font-semibold text-[20px] text-[#474747]'>Campaigns</h2>
        
        <div className='flex my-10'>
        <TextField 
        fullWidth 
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder="Enter NPO address"
        variant="filled"
        size="small"
        value={form.whitelistAddress}
        onChange={(e)=>handleFormFieldChange("whitelistAddress", e)} 
        />
        <div className="w-[20px]"></div>
         <Button 
         variant="contained"
         onClick={handleSubmit}
         >
          ADD
          </Button>
        </div>
        <DisplayUsers
      isLoading={isLoading}
      campaigns={whitelisters}
      handleDelete={handleDelete} 
      />
    </div>
    
    </div>
  )
}

export default Users