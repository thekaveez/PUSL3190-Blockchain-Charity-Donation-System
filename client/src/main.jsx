import { ThirdwebProvider } from './thirdweb';
import { Sepolia } from '@thirdweb-dev/chains';
import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// import { client, contract } from './utils/constants';
import { StateContextProvider } from './context';
import App from './App';
import './index.css';

const activeChain = Sepolia;
const clientId = '3489ec4784e40aef531ba64469f4644a';
const secretKey = 'Gvd3sTCsz_w8g1X0mU9SZZEsRbJtctPO1tT85zYA2x0Mf_CYL1ZK8XuJ83_h6sDmC9LHHtmUyLZIWNF5JvOXSg';

const root =ReactDom.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain={activeChain} clientId={clientId} secretKey={secretKey}>
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
);
// 11155111