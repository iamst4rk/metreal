import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Container, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DataInput = () => {
  const [action, setAction] = useState('need');
  const [file, setFile] = useState(null);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [itemsList, setItemsList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    axios.get('/api/stock/items')
      .then(response => {
        setItemsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching items list', error);
      });
  }, []);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('action', action);
    formData.append('item', item);
    formData.append('quantity', quantity);

    try {
      const response = await axios.post('/api/stock/update', formData);
      if (response.data.newItemRequired) {
        setNewItem(response.data.newItem);
        setDialogOpen(true);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error updating stock', error);
    }
  };

  const handleDialogClose = (createNew) => {
    if (createNew) {
      axios.post('/api/stock/create', { itemType: newItem }).then(response => {
        console.log(response.data);
        setDialogOpen(false);
      }).catch(error => {
        console.error('Error creating new item', error);
      });
    } else {
      setDialogOpen(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Ввод данных</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Действие</InputLabel>
        <Select value={action} onChange={(e) => setAction(e.target.value)}>
          <MenuItem value="need">Добавить в "Потребность"</MenuItem>
          <MenuItem value="cut">Добавить в "Вырезано"</MenuItem>
          <MenuItem value="riveted">Добавить в "Заклёпано"</MenuItem>
          <MenuItem value="painted">Добавить в "Покрашено/Передано"</MenuItem>
        </Select>
      </FormControl>

      {action === 'need' && (
        <Box marginY={2}>
          <Button variant="contained" component="label">
            Загрузить файл
            <input type="file" hidden onChange={handleFileUpload} />
          </Button>
        </Box>
      )}

      {['cut', 'riveted', 'painted'].includes(action) && (
        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel>Номенклатура</InputLabel>
            <Select value={item} onChange={(e) => setItem(e.target.value)}>
              {itemsList.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Количество"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Box>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '16px' }}>
        Отправить
      </Button>

      <Dialog open={dialogOpen} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Номенклатура не найдена</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Номенклатура "{newItem}" не найдена. Создать новую запись или отменить действие?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Отменить
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DataInput;
