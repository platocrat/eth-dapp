import React, { Component } from 'react'
import { Button } from 'reactstrap'
const ethers = require('ethers'); 


class CampaignDetails extends Component{
    constructor(props) {
        super()
        this.props = props
        console.log(props)
    }

    render() {
        return (
        <div>
        
        <div class="container-fluid" style={{paddingTop: '50px'}}>
            <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css"></link>
            <div class="row">
                <div class="col-md-9">
                    <h3>
                        Campaign name
                    </h3><img alt="Bootstrap Image Preview" src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" />
                    <dl>
                        <dt>
                            Campaign description
                        </dt>
                        <dd>
                            A description list is perfect for defining terms.
                        </dd>
                    </dl>
                </div>
                <div class="col-md-3">
                    <div class="counter">
                        <i class="fa fa-coffee fa-2x"></i>
                        <h2 class="timer count-title count-number" data-to="1700" data-speed="1500"></h2>
                        <p class="count-text ">Happy Clients</p>
                    </div>
                    <div class="counter">
                        <i class="fa fa-coffee fa-2x"></i>
                        <h2 class="timer count-title count-number" data-to="1700" data-speed="1500"></h2>
                        <p class="count-text ">Happy Clients</p>
                    </div>
                    <div class="counter">
                        <i class="fa fa-coffee fa-2x"></i>
                        <h2 class="timer count-title count-number" data-to="1700" data-speed="1500"></h2>
                        <p class="count-text ">Happy Clients</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
    }
}

export default CampaignDetails;