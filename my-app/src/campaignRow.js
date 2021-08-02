import React, { Component } from 'react'

class CampaignRow extends Component{
    render() {
        return (

        <div class="col-md-4">
            <div class="card">
                <img class="card-img-top" alt="Bootstrap Thumbnail First" src="https://www.layoutit.com/img/people-q-c-600-200-1.jpg" />
                <div class="card-block">
                    <h5 class="card-header text-center">
                        {this.props.name}
                    </h5>
                    <p class="card-text text-center">
                        {this.props.description}
                    </p>
                    <p class="card-text text-center">
                        <small>
                        {this.props.currFund} / {this.props.goal} ETH 
                        </small>
                    </p>
                    <p class="progress">
                        <div class="progress-bar w-75"> blabla
                        </div>
                    </p>
                    <p class="text-center">
                        <a class="btn btn-primary" href="#">Donate!</a>
                    </p>
                    <p class="card-text text-center"><small class="text-muted">3 days left</small></p>
                </div>
            </div>
        </div>

        );
    }
}

export default CampaignRow;

/*

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

*/