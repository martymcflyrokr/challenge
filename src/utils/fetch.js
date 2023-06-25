import React, { useEffect, useState } from 'react';
import Cards from '../components/cards/Cards';
import dataMock from './mock';
import { DataProvider } from '../context/DataContext';

const DataFetcher = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dataMock);
        }, 3000); // 
      });
    };

    fetchData()
    .then((responseData) => {
      setData(responseData);
    });
  }, []);

  return (
    <div>
       {console.log(data)}
      {data.map((item, index) => (
        <Cards />
      ))}
    </div>
  );
};

const DataFetcherWithContext = () => (
  <DataProvider>
    <DataFetcher />
  </DataProvider>
);

export default DataFetcherWithContext;
