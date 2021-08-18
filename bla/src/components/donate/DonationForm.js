import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Stack, TextField, Button } from '@material-ui/core';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDonate = () => {
    console.log(amount);
  };
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const currencies = [
    {
      value: 'USD',
      label: '$'
    },
    {
      value: 'EUR',
      label: '€'
    },
    {
      value: 'BTC',
      label: '฿'
    },
    {
      value: 'JPY',
      label: '¥'
    }
  ];

  return (
    <div>
      <Button fullWidth size="large" type="submit" variant="contained" onClick={handleClickOpen}>
        Donate
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Donate</DialogTitle>
        <DialogContent>
          <br />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              variant="outlined"
              inputProps={{
                maxLength: 13,
                step: '0.1'
              }}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <TextField
              id="standard-select-currency-native"
              select
              label="Native select"
              value={currency}
              onChange={handleChange}
              SelectProps={{
                native: true
              }}
              helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Stack>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDonate} color="primary">
            Donate
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
