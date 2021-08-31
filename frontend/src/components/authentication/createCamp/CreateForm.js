import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Datepicker from '@material-ui/lab/DatePicker';
import TimePicker from '@material-ui/lab/TimePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Home from '../../../OldHome';
import { create } from 'ipfs-http-client';

const pinataSDK = require('@pinata/sdk');
var FormData = require('form-data');
const client = create('https://ipfs.infura.io:5001/api/v0');
require('dotenv').config();

// ----------------------------------------------------------------------

export default function CreateForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const OldHome = new Home();
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      campName: '',
      campDesc: ''
    },
    // validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const options = {
        pinataMetadata: {
          name: values.campName,
          keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
          }
        },
        pinataOptions: {
          cidVersion: 0
        }
      };
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      OldHome.addCampaign(values.campName, goal, values.campDesc, selectedDate, selectedTime, url);
      //navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState(new Date());
  const [file, setFile] = useState('');
  const [goal, setGoal] = useState('');
  const [currency, setCurrency] = React.useState('');
  const [buffer, setBuffer] = React.useState('');
  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
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
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Campaign name"
            {...getFieldProps('campName')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            label="Campaign description"
            {...getFieldProps('campDesc')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Campaign goal"
              type="number"
              value={goal}
              variant="outlined"
              onChange={(e) => setGoal(e.target.value)}
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

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Datepicker
                disableToolbar
                variant="inline"
                inputFormat="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                renderInput={(props) => <TextField {...props} label="End date" />}
              />
              <TimePicker
                margin="normal"
                id="time-picker"
                value={selectedTime}
                onChange={(newValue) => {
                  setSelectedTime(newValue);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
                renderInput={(props) => <TextField {...props} label="End time" />}
              />
            </Stack>
          </LocalizationProvider>
          <label htmlFor="btn-upload">
            Choose a picture for your campaign:
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: 'none' }}
              type="file"
              onChange={fileChangeHandler}
            />
            <Button className="btn-choose" variant="outlined" component="span">
              Choose File
            </Button>
            {file.name}
          </label>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
