import 'dotenv/config'
import React, {useContext, createContext} from "react";

import {useAddress, useContract, useMetamask,
useContractWrite
} from '@thirdweb-dev/react';
import {BigNumber, ethers} from 'ethers';

const StateContext = createContext();
const contractAddress = "0xb91cab08E609A4e40dEe4B8d29F5A898Ab9a1020";

export const StateContextProvider = ({children}) => {
    const {contract} = useContract
    (contractAddress);
    const {mutateAsync: createCampaign} = useContractWrite
    (contract,'createCampaign');
    const {mutateAsync: setWhitelistAddress} = useContractWrite
    (contract,'setWhitelistAddress');

    const address = useAddress();
    const connect = useMetamask();
    

    let isWhitelisted = true;

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

    const addWhitelistAddress = async(form) => {
        try{
            const whitelistAddress = ethers.utils.getAddress(form.whitelistAddress)

            const data = await setWhitelistAddress({
                args: [
                    whitelistAddress,
                    isWhitelisted
                ]
            });
            console.log("whitelistAddress", data);

        }catch(error){
            console.log("whitelistning failed", error);

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
                cId: BigNumber.from(i),
                isActive: campaign.isActive
            
        }));
        
        // console.log(parsedCampaigns);

        return parsedCampaigns ;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }

    const getCampaignsCount = async () =>{
        const campaignsCount = await contract.call('numberOfCampaigns');
        return campaignsCount;
    }

    const getAdmin = async () => {
        const admin = await contract.call('admin');
        return admin;
    }

    const isWhitelistedAddress = async (address) => {
        const whitelist = await contract.call('whitelist', [address]);
        return whitelist;
    }

    const getWhitelistedAddress = async (id) =>{
        const whitelist = await contract.call('whitelistedAddress',[id]);
        return whitelist;
    }

    const getWhitelistersCount = async()=>{
        const whitelistCount = await contract.call('numOfWhitelisters');
        return whitelistCount;
    }

    const deleteWhitelistedAddress = async(address)=>{
        const data = await contract.call('deleteWhitelistAddress', [address]);
        return data;
    }


    const donate = async (cId, amount)=>{
        const data = await contract.call('donateToCampaign', [cId], {
            value: ethers.utils.parseEther(amount)
        });


        return data;
    }

    const deleteCampaign = async (cId)=>{
        const data = await contract.call('deleteCampaign', [cId]);
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
            setWhitelistAddress:addWhitelistAddress,
            getCampaigns,
            getUserCampaigns,
            donate,
            getDonations,
            getAdmin,
            isWhitelistedAddress,
            deleteCampaign,
            getCampaignsCount,
            getWhitelistersCount,
            getWhitelistedAddress,
            deleteWhitelistedAddress
        
        }}
            >
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext);
