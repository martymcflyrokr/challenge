import { Modal, Button, TextField, Box, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import '../cards/cards.css'
import { format } from 'date-fns';
import { DataContext } from '../../context/DataContext';


const Cards = () => {

  const { data } = useContext(DataContext);
  const { saldoDisponible } = useContext(DataContext);
  const { setSaldoDisponible } = useContext(DataContext);
  const { setData } = useContext(DataContext);
  const [criptoSeleccionada, setCriptoSeleccionada] = useState('');
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { movimientos } = useContext(DataContext);
  const { setMovimientos } = useContext(DataContext);



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

  const CalculoBalanceArs = (card) => {
    const balance = card.balance * card.buy_rate;
    const balanceEnArs = formatCurrency(balance);
    return balanceEnArs;
  }

  const formatCurrency = (value) => {
    return value.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleCompra = (card) => {
    setCriptoSeleccionada({ ...card, monedaOrigen: '', monedaDestino: '' });
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  const precioCompra = () => {
    const calculo = cantidadSeleccionada * criptoSeleccionada.buy_rate;
    return calculo;
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



  const precio = precioCompra();




  const confirmarCompra = () => {
    
    if (precio >= saldoDisponible) {
      console.log(' el precio es mayor que el saldo')
    } else if (precio <= 1500) {
      console.log('sobrepasaste los limites');
    } else {
      actualizarSaldo();
      setMovimientos((prevMovimientos) => [
        ...prevMovimientos,
        {
          cripto: criptoSeleccionada.ticker,
          cantidad: cantidadSeleccionada,
          precio,
          txn: calcularRandom(),
          fecha: fechaCompra(),
          status: 'COM',
          tipo: 'COMPRA'
          
        },
      ]);
      

    }

  }


  const actualizarSaldo = () => {
    const nuevaCriptoSeleccionada = {
      ...criptoSeleccionada,
      balance: parseFloat(criptoSeleccionada.balance) + parseFloat(cantidadSeleccionada),
    };

    const nuevoSaldoDisponible = saldoDisponible - parseFloat(cantidadSeleccionada) * criptoSeleccionada.buy_rate;

    setData(data.map((datos) => (datos.ticker === nuevaCriptoSeleccionada.ticker ? nuevaCriptoSeleccionada : datos)));
    setSaldoDisponible(nuevoSaldoDisponible);
  };

  return (
    <>
      <div className='contenedor-monedas'>
        {
          data.map((datos, index) => {
            const { ticker, balance } = datos;
            return (
              <div key={index} className="card">
                <h2>{ticker}</h2>
                <p>Saldo: {formatCurrency(balance)} </p>
                <p>Balance AR$: {CalculoBalanceArs(datos)}</p>
                <button onClick={() => handleCompra(datos)}>Comprar</button>
              </div>
            )
          }
          )}
      </div>
      <div style={{ margin: '3%' }}>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Comprar {criptoSeleccionada?.ticker}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                type='number'
                label='Cantidad'
                value={cantidadSeleccionada}
                onChange={(e) => setCantidadSeleccionada(e.target.value)
                }
              />
              <div>
                <p>Vas a gastar: AR$ {formatCurrency(precio)}</p>
                <p>Saldo Disponible: AR$ {formatCurrency(saldoDisponible)}</p>
              </div>
              <Button onClick={confirmarCompra} variant='contained' color='primary'>
                Confirmar Compra
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>

  );
};

export default Cards;