import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Stack, TextField, Button, CircularProgress } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Home from '../../OldHome';

export default function FormDialog({ id, currencies }) {
  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState('ETH');
  const [amount, setAmount] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setSubmit] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  var OldHome = new Home();
  const handleClose = () => {
    setOpen(false);
  };
  const handleDonate = async () => {
    setSubmit(true);
    console.log(currency);
    await OldHome.donate(id, amount, email, currency, window.localStorage["layer"]).then(() => {
      setOpen(false);
      setSubmit(false);
    });
    console.log(amount);
  };
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

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
              type="text"
              value={amount}
              variant="outlined"
              inputProps={{
                maxLength: 13,
                step: '0.1'
              }}
              onChange={(e) => setAmount(e.target.value.toString())}
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDonate} color="primary" disabled={isSubmitting}>
            Donate
          </Button>
          {isSubmitting && <CircularProgress />}
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
