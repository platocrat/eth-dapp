import React, { Component } from 'react'
const ethers = require('ethers');

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Current fund</th>
              <th scope="col">Goal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ethers.utils.formatEther(this.props.currFund)} ETH</td>
              <td>{ethers.utils.formatEther(this.props.goal)} ETH</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                this.donate(1,this.input.adress, amount)
              }}>
              <div>
                <label className="float-left"><b>Donate </b></label>
                <span className="float-right text-muted">
                  Balance: {ethers.utils.formatEther(this.activeCampaigns[0].currFund())} ETH
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input.amount = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp; ETH
                  </div>
                </div>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input.address = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    &nbsp;&nbsp;&nbsp;
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">DONATE!</button>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;