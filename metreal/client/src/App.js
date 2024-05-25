import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import StockTable from './components/StockTable';

function App() {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Складской запас
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Главная
            </Button>
            <Button color="inherit" component={Link} to="/input">
              Ввод данных
            </Button>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<StockTable />} />
            <Route path="/input" element={<div>Ввод данных</div>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
