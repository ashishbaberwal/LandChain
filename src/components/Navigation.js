import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navigation = ({ account, setAccount }) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
    }

    return (
        <nav>
            <ul className='nav__links'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/properties">Properties</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>

            <div className='nav__brand'>
                <Link to="/">
                  <img src={logo} alt="Logo" />
                  <h1>LandChain</h1>
                </Link>
            </div>

            {account ? (
                <button
                    type="button"
                    className='nav__connect'
                >
                    {account.slice(0, 6) + '...' + account.slice(38, 42)}
                </button>
            ) : (
                <button
                    type="button"
                    className='nav__connect'
                    onClick={connectHandler}
                >
                    Connect
                </button>
            )}
        </nav>
    );
}

export default Navigation;