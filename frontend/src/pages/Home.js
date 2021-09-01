import { useFormik } from 'formik';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Stack, Typography, Button, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  top: 50,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------
const LS_KEY = 'login-with-metamask:auth';

export default function Home(props) {
  const classes = useStyles();
  const [openFilter, setOpenFilter] = useState(false);
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });
  const { resetForm, handleSubmit } = formik;
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <RootStyle title="Home page | Minimal-UI">
      <Container sx={0} >
        <Box display="flex" justifyContent="flex-end" alignItems="right">
        {window.localStorage['username'] === undefined ?
          <Button variant="contained" component={RouterLink} to="/login" >
            Login
          </Button> : <Button variant="contained" onClick={props.onLoggedOut} component={RouterLink} to="/home">
          Logout
        </Button>}
        </Box>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="h2" align="center">
            Support children
          </Typography>
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <ProductList onlyOwner={false} />
      </Container>
    </RootStyle>
  );
}
