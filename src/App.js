import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import ContactPage from './pages/ContactPage';

// ABIs
import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

// Config
import config from './config.json';

// Off-chain data
import offchainProperties from './data/offchainProperties';

function App() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)

  const [account, setAccount] = useState(null)

  const [homes, setHomes] = useState([])
  const [allProperties, setAllProperties] = useState([])
  const [home, setHome] = useState({})
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'blockchain', 'offchain'

  const loadBlockchainData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
      const network = await provider.getNetwork()

      const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider)
      const totalSupply = await realEstate.totalSupply()
      const homes = []

      for (var i = 1; i <= totalSupply; i++) {
        const uri = await realEstate.tokenURI(i)
        const response = await fetch(uri)
        const metadata = await response.json()
        homes.push({...metadata, isBlockchain: true})
      }

      setHomes(homes)
      
      // Combine blockchain and off-chain properties
      const combined = [...homes, ...offchainProperties]
      setAllProperties(combined)

      const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider)
      setEscrow(escrow)

      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
      })
    } catch (error) {
      console.error("Error loading blockchain data:", error)
      // Load just off-chain properties if blockchain is not available
      setAllProperties(offchainProperties)
    }
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const togglePop = (home) => {
    setHome(home)
    toggle ? setToggle(false) : setToggle(true);
  }

  // Filter properties based on search and active tab
  const filteredProperties = allProperties.filter((property) => {
    // Filter by tab
    if (activeTab === 'blockchain' && !property.isBlockchain) return false;
    if (activeTab === 'offchain' && !property.isOffchain) return false;
    
    if (!search) return true;
    
    // Convert everything to lowercase for case-insensitive search
    const searchTerm = search.toLowerCase();

    // Search in address
    if (property.address && property.address.toLowerCase().includes(searchTerm)) return true;

    // Search in name
    if (property.name && property.name.toLowerCase().includes(searchTerm)) return true;

    // Search in attributes (like bedrooms, bathrooms, price, etc.)
    if (property.attributes) {
      for (const attr of property.attributes) {
        // Convert value to string in case it's a number
        const value = String(attr.value).toLowerCase();
        if (value.includes(searchTerm)) return true;

        // Also check trait_type in case someone searches for "bedrooms", "price", etc.
        const traitType = attr.trait_type.toLowerCase();
        if (traitType.includes(searchTerm)) return true;
      }
    }

    return false;
  });

  // Helper function to format price with currency
  const formatPrice = (property) => {
    if (!property || !property.attributes || !property.attributes[0]) return '';
    
    const priceAttribute = property.attributes[0];
    
    if (property.isOffchain && priceAttribute.currency === 'INR') {
      // Format INR price with commas for thousands separator (Indian number format)
      return `₹${priceAttribute.value.toLocaleString('en-IN')}`;
    } else {
      // Display ETH price
      return `${priceAttribute.value} ETH`;
    }
  };

  return (
    <Router>
      <div>
        <Navigation account={account} setAccount={setAccount} />
        
        <Routes>
          <Route path="/" element={<HomePage search={search} setSearch={setSearch} />} />
          
          <Route path="/properties" element={
            <PropertiesPage 
              allProperties={allProperties} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              filteredProperties={filteredProperties} 
              togglePop={togglePop} 
              formatPrice={formatPrice}
            />
          } />
          
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {toggle && (
          <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} formatPrice={formatPrice} />
        )}
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
