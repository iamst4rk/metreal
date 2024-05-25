import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

const StockTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/stock/items')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching stock data', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Текущие остатки на складе</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <TableCell key={key}>{key.replace(/_/g, ' ')}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, cellIndex) => (
                  <TableCell key={cellIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StockTable;
