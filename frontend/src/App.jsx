import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State variables
  const [pairings, setPairings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // NEW: Cart State
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('home'); // 'home' or 'cart'

  // API Call
  const handleGetPairings = async (coffeeId) => {
    setIsLoading(true);
    setError(null);
    setPairings(null);
    setView('home'); // Ensure we are on the home view

    try {
      // Using your LIVE Render Backend
      const response = await axios.post('https://ai-barista-pilot-backend.onrender.com/generate-pairing', {
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

  // NEW: Add to Cart Function
  const addToCart = (pastry) => {
    setCart([...cart, pastry]);
    alert(`Added ${pastry.pastry} to your order!`);
  };

  // NEW: Mock Checkout Function
  const handleCheckout = () => {
    alert("✅ Order Sent to Barista! (This is a mock checkout)");
    setCart([]); // Clear cart
    setView('home'); // Go back home
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
            <h1>☕ AI Barista Companion</h1>
            {/* NEW: Cart Button */}
            <button className="cart-btn" onClick={() => setView('cart')}>
              🛒 Cart ({cart.length})
            </button>
        </div>
        {view === 'home' && <p>Select a coffee to find its perfect pastry pairing.</p>}
      </header>

      {/* CONDITIONAL VIEW: CART vs HOME */}
      {view === 'cart' ? (
        <div className="cart-view">
          <h2>Your Order</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty. Go back to add some pastries!</p>
          ) : (
            <div className="cart-list">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>{item.pastry}</span>
                  <span>€3.50</span> {/* Mock Price */}
                </div>
              ))}
              <hr />
              <div className="cart-total">
                <strong>Total:</strong>
                <strong>€{(cart.length * 3.50).toFixed(2)}</strong>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Complete Order
              </button>
            </div>
          )}
          <button className="back-btn" onClick={() => setView('home')}>← Back to Menu</button>
        </div>
      ) : (
        <>
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
                        {/* NEW: Add to Cart Button */}
                        <button 
                          className="add-to-cart-btn" 
                          onClick={() => addToCart(item)}
                        >
                          + Add to Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;