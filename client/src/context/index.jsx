import 'dotenv/config'
import React, {useContext, createContext} from "react";

import {useAddress, useContract, useMetamask,
useContractWrite,
} from '@thirdweb-dev/react';
import {BigNumber, ethers} from 'ethers';

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
                cId: BigNumber.from(i)
            
        }));
        
        // console.log(parsedCampaigns);

        return parsedCampaigns ;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }


    const donate = async (cId, amount)=>{
        const data = await contract.call('donateToCampaign', [cId], {
            value: ethers.utils.parseEther(amount)
        });


        return data;
    }

    const getDonations = async (cId) => {
        const donations = await contract.call('getDonators', [cId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i=0; i<numberOfDonations; i++){
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            });
        }

        return parsedDonations;
    }


    return(
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            getCampaigns,
            getUserCampaigns,
            donate,
            getDonations
        
        }}
            >
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext);
