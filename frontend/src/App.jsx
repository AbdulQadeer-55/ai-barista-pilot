// In frontend/src/App.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // We are importing our new styles

function App() {
  // State variables
  const [pairings, setPairings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches pairings from our FastAPI backend
   * @param {string} coffeeId - 'standard' or 'kenia'
   */
  const handleGetPairings = async (coffeeId) => {
    setIsLoading(true);
    setError(null);
    setPairings(null); // Clear previous results

    try {
      // This is the API call to our backend (which must be running)
      const response = await axios.post('https://ai-barista-pilot.onrender.com/generate-pairing', {
  coffee_id: coffeeId
});
      setPairings(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch pairings. Is the backend server running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>☕ AI Barista Companion</h1>
        <p>Select a coffee to find its perfect pastry pairing.</p>
      </header>

      <div className="coffee-selection">
        <button onClick={() => handleGetPairings('standard')}>
          Sweetspot Standard
        </button>
        <button onClick={() => handleGetPairings('kenia')}>
          Bluebird Kenia
        </button>
      </div>

      <div className="results">
        {isLoading && <p className="loading-message">Finding the perfect pairing...</p>}
        
        {error && <p className="error-message">{error}</p>}
        
        {pairings && (
          <section>
            <h2>Pairings for: {pairings.coffee}</h2>
            <div className="pairings-container">
              {pairings.pairings.map((item) => (
                <div className="pairing-card" key={item.pastry}>
                  <img src={item.image} alt={item.pastry} />
                  <div className="pairing-card-content">
                    <h3>{item.pastry}</h3>
                    <p>{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;