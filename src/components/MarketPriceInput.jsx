import React, { useEffect, useState } from 'react';
import '../styles/MarketPrices.css'; 

const MarketPrices = () => {
  const [marketData, setMarketData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd0000017704f08e67e4414747189afb9ef2d662&format=json&offset=0&limit=4000';
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMarketData(data.records);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching market prices:', err);
      }
    };
    
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleStateFilter = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict(''); 
  };

  const handleDistrictFilter = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const filteredData = marketData.filter((record) => {
    const matchesSearch = record.commodity.toLowerCase().includes(searchInput.toLowerCase());
    const matchesState = selectedState ? record.state.toLowerCase() === selectedState.toLowerCase() : true;
    const matchesDistrict = selectedDistrict ? record.district.toLowerCase() === selectedDistrict.toLowerCase() : true;
    return matchesSearch && matchesState && matchesDistrict;
  });

  const uniqueStates = Array.from(new Set(marketData.map((item) => item.state)));
  const uniqueDistricts = Array.from(new Set(marketData
    .filter((item) => item.state.toLowerCase() === selectedState.toLowerCase())
    .map((item) => item.district)));

  return (
    <div className="market-prices-container">
      <h1>Market Prices</h1>

      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="filters">
          <input
            type="text"
            placeholder="Search by commodity..."
            value={searchInput}
            onChange={handleSearch}
          />

          <select onChange={handleStateFilter} value={selectedState}>
            <option value="">Select State</option>
            {uniqueStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select onChange={handleDistrictFilter} value={selectedDistrict} disabled={!selectedState}>
            <option value="">Select District</option>
            {uniqueDistricts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>District</th>
              <th>Market</th>
              <th>Commodity</th>
              <th>Variety</th>
              <th>Min Price</th>
              <th>Max Price</th>
              <th>Modal Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((record, index) => (
                <tr key={index}>
                  <td>{record.state}</td>
                  <td>{record.district}</td>
                  <td>{record.market}</td>
                  <td>{record.commodity}</td>
                  <td>{record.variety}</td>
                  <td>{record.min_price}</td>
                  <td>{record.max_price}</td>
                  <td>{record.modal_price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketPrices;
