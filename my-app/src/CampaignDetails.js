import React, { Component } from 'react'
import { Button } from 'reactstrap'
const ethers = require('ethers'); 


class CampaignDetails extends Component{
    constructor(props) {
        super()
        this.props = props
    }

    render() {
        return (

        <div class="col-md-12">
            <img class="rounded mx-auto d-block" alt="Bootstrap Thumbnail First" src="https://www.layoutit.com/img/people-q-c-600-200-1.jpg" />
                    <h5 class="text-center">
                        {this.props.name}
                    </h5>
                    <p class="text-center">
                        {this.props.description}
                    </p>
                    <p class="text-center">
                        <small>
                        {parseFloat(this.props.currFund).toFixed(3)} / {this.props.goal} ETH 
                        </small>
                    </p>
                    <p class="progress">
                        <div class="progress-bar w-75"> {parseFloat(100*(this.props.currFund / this.props.goal)).toFixed(2)}%
                        </div>
                    </p>
                    <p class="text-center">
                    </p>
                    <p class="text-center"><small class="text-muted">End date: {this.props.endStamp}, {this.props.daysLeft} days left</small></p>
        </div>

        );
    }
}

export default CampaignDetails;