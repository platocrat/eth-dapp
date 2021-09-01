import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Link, Container, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { Icon } from '@iconify/react';
import Tab from '@material-ui/core/Tab';
import { Stack, TextField, Button } from '@material-ui/core';
import ArrowDownwardIcon from '@iconify/icons-eva/arrow-downward-fill';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// components
import Page from '../components/Page';
import Home from '../OldHome';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 700,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 'auto'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 700,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: 700
  }
}));

export default function ToLayer2(currencies) {
  const [currency, setCurrency] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const oldHome = new Home();
  const [withdraw, setWithdraw] = React.useState('optimistic');
  const onSubmit = () => {
    console.log(amount);
    oldHome.depositL2(amount);
  };
  const handleWithdraw = () => {
    console.log(amount);
    oldHome.withdrawL2(amount);
  };
  return (
    <RootStyle title="Register | Minimal-UI">
      <Container>
        <SectionStyle>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
              >
                <LinkTab label="Deposit" href="/drafts" {...a11yProps(0)} />
                <LinkTab label="Withdraw" href="/trash" {...a11yProps(1)} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              <Typography> from: KOVAN</Typography>
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
                ></TextField>
              </Stack>
              
              <Icon icon={ArrowDownwardIcon} width={30} height={32} style={{ align: 'center' }} />

              <Typography> to: OPTIMISTIC KOVAN</Typography>
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
                ></TextField>
              </Stack>
              <Button fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
                Approve
              </Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
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
                ></TextField>
              </Stack>
              <FormControl component="fieldset">
                <FormLabel component="legend">Transation options</FormLabel>
                <RadioGroup
                  aria-label="transaction-options"
                  name="option1"
                  value={value}
                  onChange={(e) => setWithdraw(e.target.value)}
                >
                  <FormControlLabel value="optimistic" control={<Radio />} label="Optimistic" />
                  <FormControlLabel value="fast" control={<Radio />} label="Fast" />
                </RadioGroup>
              </FormControl>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleWithdraw}
              >
                Withdraw
              </Button>
            </TabPanel>
          </div>
        </SectionStyle>
      </Container>
    </RootStyle>
  );
}
