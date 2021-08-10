import React, { Component, Link } from 'react'
import { Button } from 'reactstrap'
import ModalExample from './DonationForm';
import ProgressBar from "./ProgressBar";
const ethers = require('ethers'); 


class CampaignRow extends Component{
    constructor(props) {
        super()
        this.props = props
        this.img_url = "http://localhost:8000/" + this.props.id + ".png"
    }


    render() {
        return (
        <div class="col-md-3 d-flex align-items-stretch mt-2">
            <div class="card border-dark md-2 h-100" style={{backgroundColor: this.props.color}}>
                <img class="card-img-top" alt="Bootstrap Thumbnail First" style={{height: "200px", width: "330px"}} src={this.img_url} />
                <div class="card-block">
                    <h5 class="card-header text-center" style={{backgroundColor: this.props.colorTitle}}>
                        {this.props.name}
                    </h5>
                    <p class="card-text text-center">
                        {this.props.description}
                    </p>
                    <p class="card-text text-center">
                        <small>
                        {parseFloat(this.props.currFund).toFixed(3)} / {this.props.goal} ETH 
                        </small>
                    </p>
                    <p>
                    <ProgressBar bgcolor="#cc66cc" completed={parseFloat(100*(this.props.currFund / this.props.goal)).toFixed(2)} />
                    </p>
                    <p class="text-center">
                        <ModalExample campaignProps={this.props}></ModalExample>
                    </p>
                    <p class="blockquote-footer text-center mt-1"><small class="text-muted">End date: {this.props.endStamp}, {this.props.daysLeft} days left</small></p>
                </div>
            </div>
        </div>

        );
    }
}

export default CampaignRow;

//<a style={{ textDecoration: 'none', color: 'black'}} href="/about" name={this.props.name}>