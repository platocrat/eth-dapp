import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Datepicker from '@material-ui/lab/DatePicker';
import TimePicker from '@material-ui/lab/TimePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

// ----------------------------------------------------------------------

export default function CreateForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
        validationSchema: RegisterSchema,
        onSubmit: () => {
            navigate('/dashboard', { replace: true });
        }
    });

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedTime, setSelectedTime] = React.useState(new Date());

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Campaign name"
                        {...getFieldProps('campName') }
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        label="Campaign description"
                        {...getFieldProps('campDesc') }
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Datepicker
                                disableToolbar
                                variant="inline"
                                inputFormat="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                value={selectedDate}
                                onChange={(newValue) => {setSelectedDate(newValue)}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                renderInput={(props) => (
    <TextField {...props} label="Date"/>
  )}
                            />
                            <TimePicker
                                margin="normal"
                                id="time-picker"
                                value={selectedTime}
                                onChange={(newValue) => {setSelectedTime(newValue)}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                renderInput={(props) => (
    <TextField {...props} label="Time"/>
  )}
                            />
                        </Stack>
                    </LocalizationProvider>

                    
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