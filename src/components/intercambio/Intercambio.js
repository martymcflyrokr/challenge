import React, { useState, useContext } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import { DataContext } from '../../context/DataContext';
import MenuItem from '@mui/material/MenuItem';
import './intercambio.css';
import { format } from 'date-fns';
import Swal from 'sweetalert2';


const Intercambio = () => {
  const { data, saldoDisponible, setSaldoDisponible, setData } = useContext(DataContext);
  const [monedaOrigen, setMonedaOrigen] = useState('');
  const [monedaDestino, setMonedaDestino] = useState('');
  const [cantidadOrigen, setCantidadOrigen] = useState('');
  const [cantidadDestino, setCantidadDestino] = useState('');
  const { movimientos, setMovimientos } = useContext(DataContext);


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleCalculo = () => {
    const origen = data.find((moneda) => moneda.ticker === monedaOrigen);
    const destino = data.find((moneda) => moneda.ticker === monedaDestino);

    if (origen && destino) {

      const saldoVentaDestino = parseFloat(cantidadOrigen) * destino.sell_rate;
      const cantidadCompraDestino = saldoVentaDestino / destino.buy_rate;

      setCantidadDestino(cantidadCompraDestino.toFixed(2));
    }
  };

  const calcularRandom = () => {
    const randomize = Math.ceil(Math.random() * 49);
    return randomize
  }


  const fechaCompra = () => {
    const fc = new Date();
    const formattedDate = format(fc, 'dd/MM/yyyy HH:mm:ss');
    return formattedDate;
  }


  const handleConfirmar = () => {

    
    const origen = data.find((moneda) => moneda.ticker === monedaOrigen);
    const destino = data.find((moneda) => moneda.ticker === monedaDestino);
  
    if (origen && destino) {


      const saldoVentaDestino = parseFloat(cantidadOrigen) * destino.sell_rate;
      const cantidadCompraDestino = saldoVentaDestino / destino.buy_rate;

      if( cantidadCompraDestino <= origen.balance) {

      const nuevoSaldoDisponible = parseFloat(saldoDisponible) + saldoVentaDestino - parseFloat(cantidadCompraDestino) * destino.buy_rate;
  
      setSaldoDisponible(nuevoSaldoDisponible.toFixed(2));

      
      setData((prevData) =>
        prevData.map((moneda) => {
          if (moneda.ticker === monedaOrigen) {
            return {
              ...moneda,
              balance: moneda.balance - parseFloat(cantidadOrigen),
            };
          } else if (moneda.ticker === monedaDestino) {
            return {
              ...moneda,
              balance: (parseFloat(moneda.balance) + parseFloat(cantidadCompraDestino)).toFixed(2),
            };
          } else {
            return moneda;
          }
        })
        
      );

      setMovimientos((prevMovimientos) => [
        ...prevMovimientos,
        {
          cripto: `${monedaDestino} / ${monedaOrigen}`,
          cantidad: parseFloat(cantidadCompraDestino).toFixed(2),
          precio:parseFloat(saldoVentaDestino).toFixed(2),
          txn:calcularRandom(),
          fecha:fechaCompra(),
          status:'COM',
          tipo:'INTERCAMBIO', 
        },
      ])

      Swal.fire(
        'Intercambio realizado correctamente!',
        '',
        'success'
      )
    

      } else {
        Swal.fire({
          title: 'Saldo insuficiente!',
          text: 'No tienes la cripto suficiente para el intercambio',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }
  };


  return (
    <>
      <section className='section-intercambio'>
        <div className='container-intercambio'>
          <Typography variant="h6" component="h2">
            Intercambia entre monedas
          </Typography>
          <TextField
            select
            label="Moneda Origen"
            value={monedaOrigen}
            onChange={(e) => setMonedaOrigen(e.target.value)}
            sx={{ width: '100%', mt: 2 }}
          >
            {data.map((moneda) => (
              <MenuItem key={moneda.ticker} value={moneda.ticker}>
                {moneda.ticker}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Moneda Destino"
            value={monedaDestino}
            onChange={(e) => setMonedaDestino(e.target.value)}
            sx={{ width: '100%', mt: 2 }}
          >
            {data.map((moneda) => (
              <MenuItem key={moneda.ticker} value={moneda.ticker}>
                {moneda.ticker}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="number"
            label="Cantidad"
            value={cantidadOrigen}
            onChange={(e) => setCantidadOrigen(e.target.value)}
            sx={{ width: '100%', mt: 2 }}
          />
          <Button onClick={handleCalculo} variant='contained' color='primary' sx={{ mt: 2 }}>
            Calcular
          </Button>
          <TextField
            type="number"
            label={monedaDestino}
            value={cantidadDestino}
            disabled
            sx={{ width: '100%', mt: 2 }}
          />
          <Button onClick={handleConfirmar} variant='contained' color='primary' sx={{ mt: 2 }}>
            Confirmar
          </Button>
        </div>
      </section>
    </>
  );
};

export default Intercambio;
