import React, { Component } from 'react'

class CampaignRow extends Component{
    render() {
        return (


<div class="card text-center w-50">
<div class="card-header text-white bg-info"><b>
campaign ID: {this.props.id}</b>
</div>
<div class="card-body">
  <h5 class="card-title">{this.props.name}</h5>
  <p class="card-text">Description: {this.props.description}</p>
</div>
<div class="card-footer text-primary"><b>
{this.props.currFund} / {this.props.goal} ETH </b>
</div>
</div>

        );
    }
}

export default CampaignRow;