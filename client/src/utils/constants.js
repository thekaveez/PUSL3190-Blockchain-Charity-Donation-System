import { cre } from '@thirdweb-dev/react';

const CLIENT_ID = process.env.REACT_APP_THIRDWEB_CLIENT_ID;

export const client = createThirdwebClient({
    clientId: CLIENT_ID,
});

// export const chain = (chainId) => ({
//     chainId,
//     network: 'mainnet',
//     chainName: 'Thirdweb',
//     nativeCurrency: {
//         name: 'Thirdweb',
//         symbol: 'THIRD',
//         decimals: 18,
//     },
//     rpcUrls: ['https://api.thirdweb.io'],
//     blockExplorerUrls: ['https://explorer.thirdweb.io'],
// });

export const contract = getContract({ 
    client, 
    chain: defineChain(11155111), 
    address: "0x99D9260fF6FeF6332b5D83e70907b76a68c0611C"
  });