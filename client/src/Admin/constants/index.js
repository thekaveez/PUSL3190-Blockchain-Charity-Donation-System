import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'Dashboard',
    imgUrl: dashboard,
    link: '/admin',
  },
  {
    name: 'Campaigns',
    imgUrl: createCampaign,
    link: '/admin-campaigns',
  },
  // {
  //   name: 'payment',
  //   imgUrl: payment,
  //   link: '/',
  //   disabled: true,
  // },
  // {
  //   name: 'withdraw',
  //   imgUrl: withdraw,
  //   link: '/',
  //   disabled: true,
  // },
  {
    name: 'Users',
    imgUrl: profile,
    link: '/admin-users',
  },

//   {
//     name: 'Admin',
//     imgUrl: profile,
//     link: '/admin',
//   },
  {
    name: 'Logout',
    imgUrl: logout,
    link: '/',
  },
];