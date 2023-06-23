import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from "../../context/DataContext";
import '../saldo/saldo.css'

const Saldo = () => {
    const {data} = useContext(DataContext);
    const {saldoDisponible} = useContext(DataContext);
    const {saldoIncialArs} = useContext(DataContext);

    return(
        <div className='balance-general'>
            <p>Balance general: AR$ {saldoIncialArs.toLocaleString()}</p>
            <p>Disponible para compra: AR$ {saldoDisponible}</p>
        </div>
    )
}

export default Saldo;