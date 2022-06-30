import '../App.css'
import { useEffect, useState } from "react";
import { ethers } from "ethers"
import { networks } from '../utils/networks';
import WorkoutForm from "./WorkoutForm";

function Home() {
    // consts
    const [currentAccount, setCurrentAccount] = useState('');
    const [profile, setProfile] = useState([]);
    const [network, setNetwork] = useState('');

    // Implement connectWallet method
    const connectWallet = async () => {
        try {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Get MetaMask -> https://metamask.io/");
            return;
        }

        // method to request access to account.
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        // This should print out public address once we authorize Metamask.
        console.log("Connected", accounts[0]);
        const account = accounts[0];
        setCurrentAccount(account);
        } catch (error) {
        console.log(error)
        }
    }

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
        console.log('Make sure you have metamask!');
        return;
        } else {
        console.log('We have the ethereum object', ethereum);
        }
    
        // Check if we're authorized to access the user's wallet
        const accounts = await ethereum.request({ method: 'eth_accounts' });
    
        // Users can have multiple authorized accounts, we grab the first one.
        if (accounts.length !== 0) {
        const account = accounts[0];
            console.log('Found an authorized account:', account);
        } else {
            console.log('No authorized account found');
        }

        // check the user's network chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setNetwork(networks[chainId]);

        ethereum.on('chainChanged', handleChainChanged);
        
        // Reload the page when they change networks
        function handleChainChanged(_chainId) {
            window.location.reload();
        }
    };

    // Create a function to render if Lens account is not connected yet
    const renderNotConnectedContainer = () => (
        <div>
            <h1>Sparta</h1>
            <p>
            Sparta is a social fitness app built on &nbsp;  
            <a
                className="App-link"
                href="https://lens.xyz/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Lens
            </a> 
            </p>
            <button onClick={connectWallet} className='cta-button connect-button'>
            Sign in with Lens
            </button>
            <div className='sub-text'>
                <p>Get your Lens profile &nbsp;
                    <a
                        className="App-link"
                        href="https://claim.lens.xyz/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >here</a>
                </p>
            </div>
        </div>
    );

    const renderConnectedContainer = () => (
        <div>
            <p className="sub-text"> Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p>
            { WorkoutForm() }
        </div>
    );

    useEffect(() => {
    checkIfWalletIsConnected();
    }, [])
    
    return (
        <div className="home-container">
            { !currentAccount && renderNotConnectedContainer() }
            { currentAccount && renderConnectedContainer() }
        </div>
    );
}

export default Home