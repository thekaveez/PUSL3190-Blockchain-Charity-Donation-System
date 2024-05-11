import React, { useState, useEffect } from "react";

import { DisplayCampaigns } from "../components";

import { useStateContext } from "../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  
  // const [searchQuery, setSearchQuery] = useState("");

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const filteredCampaigns = campaigns.filter((campaign) => {
  //    campaign.title.toLowerCase().includes(searchQuery.toLowerCase());
  // });

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
