import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'Home',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Create Campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  // {
  //   name: 'payment',
  //   imgUrl: payment,
  //   link: '/',
  //   disabled: true,
  // },
  // {
  //   name: 'etherscan',
  //   imgUrl: withdraw,
  //   link: 'https://sepolia.etherscan.io/address/0xb91cab08E609A4e40dEe4B8d29F5A898Ab9a1020',
  // },
  {
    name: 'Profile',
    imgUrl: profile,
    link: '/profile',
  },

  {
    name: 'Admin',
    imgUrl: profile,
    link: '/admin',
    isAdmin:true
  },
  // {
  //   name: 'logout',
  //   imgUrl: logout,
  //   link: '/',
  //   disabled: true,
  // },
];