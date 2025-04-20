import React from 'react';

const PropertiesPage = ({ 
  allProperties, 
  activeTab, 
  setActiveTab, 
  filteredProperties, 
  togglePop, 
  formatPrice 
}) => {
  return (
    <div className='properties-page'>
      <div className='properties-hero'>
        <div className='container'>
          <h1>Explore Properties</h1>
          <p>Discover traditional and blockchain-secured properties</p>
        </div>
      </div>

      <div className='cards__section'>
        <div className="container">
          <div className="property-filters">
            <h3>Filter Properties</h3>
            
            <div className="property-tabs">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Properties
              </button>
              <button 
                className={`tab-btn ${activeTab === 'blockchain' ? 'active' : ''}`}
                onClick={() => setActiveTab('blockchain')}
              >
                Blockchain Properties
              </button>
              <button 
                className={`tab-btn ${activeTab === 'offchain' ? 'active' : ''}`}
                onClick={() => setActiveTab('offchain')}
              >
                Off-chain Properties
              </button>
            </div>

            <div className="advanced-filters">
              <div className="filter-group">
                <label>Price Range</label>
                <div className="range-inputs">
                  <input type="text" placeholder="Min" />
                  <span>to</span>
                  <input type="text" placeholder="Max" />
                </div>
              </div>
              
              <div className="filter-group">
                <label>Bedrooms</label>
                <div className="checkbox-group">
                  <label><input type="checkbox" /> 1+</label>
                  <label><input type="checkbox" /> 2+</label>
                  <label><input type="checkbox" /> 3+</label>
                  <label><input type="checkbox" /> 4+</label>
                </div>
              </div>

              <div className="filter-group">
                <label>Property Type</label>
                <select>
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="land">Land</option>
                </select>
              </div>
            </div>
          </div>

          <div className='cards'>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property, index) => (
                <div className={`card ${property.isOffchain ? 'card--offchain' : 'card--blockchain'}`} 
                     key={index} 
                     onClick={() => togglePop(property)}>
                  <div className='card__image'>
                    <img src={property.image} alt="Property" />
                    {property.isOffchain && <span className="property-badge offchain">Off-chain</span>}
                    {property.isBlockchain && <span className="property-badge blockchain">Blockchain</span>}
                  </div>
                  <div className='card__info'>
                    <h4>{formatPrice(property)}</h4>
                    <p>
                      <strong>{property.attributes[2].value}</strong> bds |
                      <strong>{property.attributes[3].value}</strong> ba |
                      <strong>{property.attributes[4].value}</strong> sqft
                    </p>
                    <p>{property.address}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No properties match your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
