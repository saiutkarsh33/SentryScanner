import  { useState } from 'react';

const AlertBox = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Don't render anything if the alert box is not visible
  }

  const alertBoxStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 2147483647,
    backgroundColor: '#cc0000',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    fontWeight: 'normal',
    borderRadius: '5px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    boxSizing: 'border-box',
    width: '250px',
    height: 'auto',
  };

  const paragraphStyle = {
    margin: 0,
    lineHeight: 1.6,
  };

  const strongStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
  };

  const spanStyle = {
    textDecoration: 'underline',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    color: 'white',
    lineHeight: 1,
    padding: '5px',
  };

  return (
    <div style={alertBoxStyle}>
      <img
        src={chrome.runtime.getURL('assets/128x128.png')}
        alt="Sentrii Logo"
        style={{ width: '50px', height: 'auto', marginTop: '10px' }}
      />
      <p style={paragraphStyle}>
        <strong style={strongStyle}>Warning:</strong> Sentrii detects <span style={spanStyle}>malicious</span> activity! This website may be a <span style={spanStyle}>phishing</span> site!
      </p>
      <button id="closeButton" style={closeButtonStyle} onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default AlertBox;

  