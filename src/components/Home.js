import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import close from '../assets/close.svg';
import ContactForm from './ContactForm';
import ExpressInterestForm from './ExpressInterestForm';

const Home = ({ home, provider, account, escrow, togglePop, formatPrice }) => {
    const [hasBought, setHasBought] = useState(false)
    const [hasLended, setHasLended] = useState(false)
    const [hasInspected, setHasInspected] = useState(false)
    const [hasSold, setHasSold] = useState(false)
    const [showContactForm, setShowContactForm] = useState(false)
    const [showInterestForm, setShowInterestForm] = useState(false)

    const [buyer, setBuyer] = useState(null)
    const [lender, setLender] = useState(null)
    const [inspector, setInspector] = useState(null)
    const [seller, setSeller] = useState(null)

    const [owner, setOwner] = useState(null)

    const fetchDetails = async () => {
        // Only fetch blockchain details for blockchain properties
        if (!home.isOffchain && escrow) {
            try {
                // -- Buyer
                const buyer = await escrow.buyer(home.id)
                setBuyer(buyer)

                const hasBought = await escrow.approval(home.id, buyer)
                setHasBought(hasBought)

                // -- Seller
                const seller = await escrow.seller()
                setSeller(seller)

                const hasSold = await escrow.approval(home.id, seller)
                setHasSold(hasSold)

                // -- Lender
                const lender = await escrow.lender()
                setLender(lender)

                const hasLended = await escrow.approval(home.id, lender)
                setHasLended(hasLended)

                // -- Inspector
                const inspector = await escrow.inspector()
                setInspector(inspector)

                const hasInspected = await escrow.inspectionPassed(home.id)
                setHasInspected(hasInspected)
            } catch (error) {
                console.error("Error fetching property details:", error)
            }
        }
    }

    const fetchOwner = async () => {
        if (home.isOffchain) return
        
        if (escrow && await escrow.isListed(home.id)) return

        try {
            const owner = await escrow.buyer(home.id)
            setOwner(owner)
        } catch (error) {
            console.error("Error fetching owner:", error)
        }
    }

    const buyHandler = async () => {
        const escrowAmount = await escrow.escrowAmount(home.id)
        const signer = await provider.getSigner()

        // Buyer deposit earnest
        let transaction = await escrow.connect(signer).depositEarnest(home.id, { value: escrowAmount })
        await transaction.wait()

        // Buyer approves...
        transaction = await escrow.connect(signer).approveSale(home.id)
        await transaction.wait()

        setHasBought(true)
    }

    const inspectHandler = async () => {
        const signer = await provider.getSigner()

        // Inspector updates status
        const transaction = await escrow.connect(signer).updateInspectionStatus(home.id, true)
        await transaction.wait()

        setHasInspected(true)
    }

    const lendHandler = async () => {
        const signer = await provider.getSigner()

        // Lender approves...
        const transaction = await escrow.connect(signer).approveSale(home.id)
        await transaction.wait()

        // Lender sends funds to contract...
        const lendAmount = (await escrow.purchasePrice(home.id) - await escrow.escrowAmount(home.id))
        await signer.sendTransaction({ to: escrow.address, value: lendAmount.toString(), gasLimit: 60000 })

        setHasLended(true)
    }

    const sellHandler = async () => {
        const signer = await provider.getSigner()

        // Seller approves...
        let transaction = await escrow.connect(signer).approveSale(home.id)
        await transaction.wait()

        // Seller finalize...
        transaction = await escrow.connect(signer).finalizeSale(home.id)
        await transaction.wait()

        setHasSold(true)
    }

    const handleContactClick = () => {
        setShowContactForm(true);
        setShowInterestForm(false);
    };

    const handleInterestClick = () => {
        setShowInterestForm(true);
        setShowContactForm(false);
    };

    const handleBackFromContact = () => {
        setShowContactForm(false);
    };

    const handleBackFromInterest = () => {
        setShowInterestForm(false);
    };

    useEffect(() => {
        if (!home.isOffchain) {
            fetchDetails()
            fetchOwner()
        }
    }, [hasSold, home])

    return (
        <div className="home">
            <div className='home__details'>
                <div className="home__image">
                    <img src={home.image} alt="Home" />
                    {home.isOffchain && <span className="property-badge property-badge--large offchain">Off-chain Property</span>}
                </div>
                
                {showContactForm ? (
                    <ContactForm 
                        property={home} 
                        onBack={handleBackFromContact} 
                        isOffchain={home.isOffchain} 
                    />
                ) : showInterestForm ? (
                    <ExpressInterestForm 
                        property={home}
                        onBack={handleBackFromInterest}
                    />
                ) : (
                    <div className="home__overview">
                        <h1>{home.name}</h1>
                        <p>
                            <strong>{home.attributes[2].value}</strong> bds |
                            <strong>{home.attributes[3].value}</strong> ba |
                            <strong>{home.attributes[4].value}</strong> sqft
                        </p>
                        <p>{home.address}</p>

                        <h2>{formatPrice(home)}</h2>

                        {owner ? (
                            <div className='home__owned'>
                                Owned by {owner.slice(0, 6) + '...' + owner.slice(38, 42)}
                            </div>
                        ) : home.isOffchain ? (
                            <div className="home__actions">
                                <button className='home__contact' onClick={handleContactClick}>
                                    Contact agent
                                </button>
                                <button className='home__buy' onClick={handleInterestClick}>
                                    Express Interest
                                </button>
                            </div>
                        ) : (
                            <div>
                                {(account === inspector) ? (
                                    <button className='home__buy' onClick={inspectHandler} disabled={hasInspected}>
                                        Approve Inspection
                                    </button>
                                ) : (account === lender) ? (
                                    <button className='home__buy' onClick={lendHandler} disabled={hasLended}>
                                        Approve & Lend
                                    </button>
                                ) : (account === seller) ? (
                                    <button className='home__buy' onClick={sellHandler} disabled={hasSold}>
                                        Approve & Sell
                                    </button>
                                ) : (
                                    <button className='home__buy' onClick={buyHandler} disabled={hasBought}>
                                        Buy
                                    </button>
                                )}

                                <button className='home__contact' onClick={handleContactClick}>
                                    Contact agent
                                </button>
                            </div>
                        )}

                        <hr />

                        <h2>Overview</h2>

                        <p>
                            {home.description}
                        </p>

                        <hr />

                        <h2>Facts and features</h2>

                        <ul>
                            {home.attributes.map((attribute, index) => (
                                <li key={index}>
                                    <strong>{attribute.trait_type}</strong> : 
                                    {attribute.trait_type === 'Price' && home.isOffchain && attribute.currency === 'INR' 
                                        ? ` ₹${attribute.value.toLocaleString('en-IN')}` 
                                        : ` ${attribute.value}${attribute.currency ? ` ${attribute.currency}` : ''}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button onClick={togglePop} className="home__close">
                    <img src={close} alt="Close" />
                </button>
            </div>
        </div>
    );
}

export default Home;