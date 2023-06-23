import { useContext } from 'react';
import React from 'react';
import { DataContext } from "../../context/DataContext";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import '../historial/historial.css';

const Historial = () => {
    const { movimientos } = useContext(DataContext);
  
    return (
      <div className='contenedor-historial'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha y Hora</TableCell>
                <TableCell>Cripto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio ARS</TableCell>
                <TableCell>Num Operación</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movimientos.map((datos, index) => {
                const { tipo, cripto, cantidad, precio, txn, fecha, status } = datos;
                return (
                  <TableRow key={index}>
                    <TableCell>{fecha}</TableCell>
                    <TableCell>{cripto}</TableCell>
                    <TableCell>{cantidad}</TableCell>
                    <TableCell>${precio}</TableCell>
                    <TableCell>#{txn}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>{tipo}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  
  export default Historial;
  