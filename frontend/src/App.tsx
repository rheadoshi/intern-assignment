import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import StockSelectionWithButton from './components/StockSelection';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <StockSelectionWithButton />
    </div>
  );
}

export default App;
