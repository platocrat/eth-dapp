import PropTypes from 'prop-types';
import React, { Component, useState } from 'react';
// material
import { Grid, CircularProgress, Button } from '@material-ui/core';
import ShopProductCard from './ProductCard';
import Home from '../../../OldHome';

// ----------------------------------------------------------------------

// ProductList.propTypes = {
//   products: PropTypes.array.isRequired
// };

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currCampList: [],
      prevCampList: [],
      currs: []
    };
  }
  render() {
    const OldHome = new Home();
    var camps = OldHome.loadBlockchainData().then((rez) => {
      var newCamps = [];
      for (var [key, value] of Object.entries(rez.activeCamps)) {
        var camp = {
          name: value.name,
          id: value.id,
          currFund: value.currFund,
          goal: value.goal,
          description: value.description,
          endStamp: value.endTimeStamp,
          daysLeft: value.daysLeft,
          color: '#e0eede'
        };
        newCamps.push(camp);
      }
      var currencies = [];
      currencies.push({ value: 'ETH', label: 'ETH' });
      if (OldHome.tokensDict) {
        for (var [label, value] of Object.entries(OldHome.tokensDict)) {
          currencies.push({ value: value, label: label });
        }
      }
      this.setState({
        loading: false,
        currCampList: newCamps,
        currs: currencies
      });
    });

    if (!this.state.loading) {
      return (
        <Grid container spacing={3}>
          {this.state.currCampList.map((camp) => (
            <Grid key={camp.id} item xs={12} sm={6} md={3}>
              <ShopProductCard camp={camp} currencies={this.state.currs} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <div>
          <CircularProgress />
          Loading....
        </div>
      );
    }
  }
}
