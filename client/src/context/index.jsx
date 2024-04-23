import 'dotenv/config'
import React, {useContext, createContext} from "react";

import {useAddress, useContract, useMetamask,
useContractWrite,
} from '@thirdweb-dev/react';
import {ethers} from 'ethers';

const StateContext = createContext();
const contractAddress = "0x99D9260fF6FeF6332b5D83e70907b76a68c0611C";

export const StateContextProvider = ({children}) => {
    const {contract} = useContract
    (contractAddress);
    const {mutateAsync: createCampaign} = useContractWrite
    (contract,'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try{
            const data = await createCampaign({
         args: [      
                address, // owner
                form.title, // title
                form.description, // description
                form.target, // target
                new Date(form.deadline).getTime(), // deadline,
                form.image
            ]
        });
            console.log("contract call success", data);

        }catch(error){
            console.log("contract call failed", error);

        }

    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaigns = campaigns.map((campaign, i) => 
        ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                image: campaign.image,
                cId: i
            
        }));
        
        // console.log(parsedCampaigns);

        return parsedCampaigns ;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }


    return(
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            getCampaigns,
            getUserCampaigns
        
        }}
            >
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext);
