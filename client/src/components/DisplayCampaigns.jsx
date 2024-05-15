import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import FundCard from "./FundCard";
import { loader } from "../assets";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();


  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  const activeCampaigns = campaigns.filter(campaign => campaign.isActive);
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[#3b3d3b] text-left">
        {title} ({activeCampaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px] ">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && activeCampaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#808191] ">
            You have not created any campaigns yet.
          </p>
        )}

        {!isLoading &&
          activeCampaigns.length > 0 &&
          activeCampaigns.map((campaign) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
