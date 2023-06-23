import React, { createContext, useEffect, useState } from 'react';
import mockData from '../utils/mock';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [saldoDisponible, setSaldoDisponible] = useState(0);
  const [criptoSeleccionada, setCriptoSeleccionada] = useState(null);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState('');
  const [saldoIncialArs, setSaldoIncialArs] = useState('');
  const [movimientos, setMovimientos] = useState([]);


  useEffect(() => {
    // Aquí puedes realizar alguna lógica adicional si es necesario antes de establecer los datos en el estado
    setData(mockData);
    parseFloat(setSaldoDisponible(8000));
  }, []);

    useEffect(() =>{
      calculateSaldoInicialArs()
  },[data])

  useEffect(() => {
    console.log('array de movimientos', movimientos)
  }, [movimientos])

  const calculateSaldoInicialArs = () => {
    if(data.length>0) {
        const saldo = data.reduce(
            (acummulator, crypto) => 
            acummulator+parseFloat(crypto.balance) * parseFloat(crypto.buy_rate),
            0
        );
        setSaldoIncialArs(saldo.toLocaleString('es-AR', { minimumFractionDigits: 2 }));
        
      }
}

  const values = {
    saldoDisponible,
    data,
    criptoSeleccionada,
    cantidadSeleccionada,
    setSaldoDisponible,
    setData,
    setCriptoSeleccionada,
    setCantidadSeleccionada,
    saldoIncialArs,
    movimientos,
    setMovimientos,

  }

  return (
    <DataContext.Provider value={values}>
      {children}
    </DataContext.Provider>
  );
};
