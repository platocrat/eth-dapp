import React, { Component } from 'react'

class CampaignRow extends Component{
    render() {
        return (
            <table className="table table-borderless text-muted text-center">
            <thead>
            <tr>
              <th> {this.props.name} </th>
              <th> campaign ID: {this.props.id} </th>
              <th> {this.props.currFund} / {this.props.goal} </th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td> Description: {this.props.description}</td>
          </tr>
        </tbody>
        </table>
        );
    }
}

export default CampaignRow;