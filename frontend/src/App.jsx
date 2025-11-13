import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State variables
  const [pairings, setPairings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Cart & UI State
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('home'); 
  const [notification, setNotification] = useState(null); // New Notification State

  // API Call
  const handleGetPairings = async (coffeeId) => {
    setIsLoading(true);
    setError(null);
    setPairings(null);
    setView('home');

    try {
      // CORRECT URL (No -backend)
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

  // Helper: Show Notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  // Add to Cart
  const addToCart = (pastry) => {
    setCart([...cart, pastry]);
    showNotification(`Added ${pastry.pastry} to your order!`); // Better UX than alert()
  };

  // Checkout
  const handleCheckout = () => {
    showNotification("✅ Order Sent to Barista!");
    setTimeout(() => {
      setCart([]); 
      setView('home'); 
    }, 1500);
  };

  return (
    <div className="App">
      {/* New Notification Component */}
      {notification && <div className="notification-toast">{notification}</div>}

      <header className="App-header">
        <div className="header-content">
            <div className="logo-area">
              <span className="logo-icon">☕</span>
              <h1>AI Barista Companion</h1>
            </div>
            <button className={`cart-btn ${cart.length > 0 ? 'active' : ''}`} onClick={() => setView('cart')}>
              🛒 Cart ({cart.length})
            </button>
        </div>
        {view === 'home' && <p className="subtitle">Select your coffee to discover the perfect pastry pairing.</p>}
      </header>

      {view === 'cart' ? (
        <div className="cart-view fade-in">
          <h2>Your Order</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <span style={{fontSize: '3rem'}}>🥐</span>
              <p>Your cart is empty.</p>
              <button className="back-btn" onClick={() => setView('home')}>Browse Menu</button>
            </div>
          ) : (
            <div className="cart-list">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-info">
                    <span className="item-name">{item.pastry}</span>
                    <span className="item-reason">Pairing Selection</span>
                  </div>
                  <span className="item-price">€3.50</span> 
                </div>
              ))}
              <div className="cart-summary">
                <div className="cart-total-row">
                  <span>Total</span>
                  <span>€{(cart.length * 3.50).toFixed(2)}</span>
                </div>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Complete Order
              </button>
              <button className="back-text-btn" onClick={() => setView('home')}>← Back to Menu</button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="coffee-selection fade-in">
            <button 
              className={pairings?.coffee.includes('Standard') ? 'selected' : ''}
              onClick={() => handleGetPairings('standard')}
            >
              Sweetspot Standard
            </button>
            <button 
              className={pairings?.coffee.includes('Kenia') ? 'selected' : ''}
              onClick={() => handleGetPairings('kenia')}
            >
              Bluebird Kenia
            </button>
          </div>

          <div className="results">
            {isLoading && <div className="loading-spinner">☕ Brewing recommendations...</div>}
            
            {error && <p className="error-message">{error}</p>}
            
            {pairings && (
              <section className="fade-in-up">
                <h2 className="pairing-header">Recommended Pairings</h2>
                <p className="pairing-sub">Based on: <strong>{pairings.coffee}</strong></p>
                
                <div className="pairings-container">
                  {pairings.pairings.map((item) => (
                    <div className="pairing-card" key={item.pastry}>
                      <div className="card-image-wrapper">
                        <img src={item.image} alt={item.pastry} />
                        <div className="image-overlay"></div>
                      </div>
                      <div className="pairing-card-content">
                        <div className="card-header">
                            <h3>{item.pastry}</h3>
                            <span className="price-tag">€3.50</span>
                        </div>
                        <p className="reason-text">{item.reason}</p>
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