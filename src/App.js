import React from 'react';
import { DataProvider } from './context/DataContext';
import Cards from './components/cards/Cards';
import Saldo from './components/saldo/Saldo';
import Historial from './components/historial/Historial';
import Navbar from './components/navbar/Navbar';
import Intercambio from './components/intercambio/Intercambio';
import '../src/App.css'


const App = () => {
  return (
  
      <DataProvider>
        <Navbar/>
        <Saldo/>
        <Cards/>
        <Intercambio/>
        <Historial/>
      </DataProvider>

  );
};

export default App;
