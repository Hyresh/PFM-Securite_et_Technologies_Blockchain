import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import './App.css';

import Sidebar from './components/Sidebar';
import Topbar from './components/Navbar';
import Home from './pages/Home';
import Ex1Somme from './pages/Ex1Somme';
import Ex2Conversion from './pages/Ex2Conversion';
import Ex3GestionChaines from './pages/Ex3GestionChaines';
import Ex4Signe from './pages/Ex4Signe';
import Ex5Parite from './pages/Ex5Parite';
import Ex6Tableaux from './pages/Ex6Tableaux';
import Ex7POO from './pages/Ex7POO';
import Ex8Payment from './pages/Ex8Payment';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [networkId, setNetworkId] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          const netId = await web3Instance.eth.net.getId();
          setWeb3(web3Instance);
          setAccount(accounts[0]);
          setNetworkId(netId.toString());
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0] || '');
          });
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });
        } else {
          console.warn('MetaMask non détecté. Connexion directe à Ganache...');
          const web3Instance = new Web3('http://127.0.0.1:7545');
          const accounts = await web3Instance.eth.getAccounts();
          const netId = await web3Instance.eth.net.getId();
          setWeb3(web3Instance);
          setAccount(accounts[0]);
          setNetworkId(netId.toString());
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de Web3:', error);
      }
    };

    initWeb3();
  }, []);

  return (
    <Router>
      <div className="flex min-h-screen bg-deep-space-blue font-sans text-papaya-whip selection:bg-brick-red selection:text-deep-space-blue">
        <Sidebar />
        <div className="flex-1 ml-[260px] flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#004266] via-deep-space-blue to-[#001f2f]">
          <Topbar account={account} networkId={networkId} />
          <main className="flex-1 p-10 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ex1" element={<Ex1Somme web3={web3} account={account} />} />
                <Route path="/ex2" element={<Ex2Conversion web3={web3} account={account} />} />
                <Route path="/ex3" element={<Ex3GestionChaines web3={web3} account={account} />} />
                <Route path="/ex4" element={<Ex4Signe web3={web3} account={account} />} />
                <Route path="/ex5" element={<Ex5Parite web3={web3} account={account} />} />
                <Route path="/ex6" element={<Ex6Tableaux web3={web3} account={account} />} />
                <Route path="/ex7" element={<Ex7POO web3={web3} account={account} />} />
                <Route path="/ex8" element={<Ex8Payment web3={web3} account={account} />} />
              </Routes>
            </div>
          </main>
          <footer className="py-6 px-8 border-t border-steel-blue/20 text-sm font-medium text-papaya-whip/40 flex items-center justify-center gap-3 bg-[#001f2f]/50 backdrop-blur-md">
            Réseau Ganache <span className="w-1.5 h-1.5 rounded-full bg-brick-red opacity-50" /> 8 contrats déployés
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
