import React from 'react';
import './App.css';
import GraecoLatinSquareGenerator from './GraecoLatinSquareGenerator';

/**
 * The main application component.
 * Serves as a wrapper for the GraecoLatinSquareGenerator component.
 */
function App() {
  return (
    <div className="App">
      <GraecoLatinSquareGenerator />
    </div>
  );
}

export default App;
