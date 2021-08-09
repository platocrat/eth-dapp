import React, { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import emailjs from 'emailjs-com'
import Campaign from "./abis/Campaign.json"
import Organisation from "./abis/Organisation.json"
import { Form, FormGroup, Label, Input, FormText, Spinner  } from 'reactstrap';
const ethers = require('ethers'); 


const Member = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [spinner, setSpinner] = useState(false);
  const addCampaign = async (name, goal, description, date, time) => {
    console.log(date, time)
    var datetime = date + "T" + time;
    var stamp = new Date(datetime);
    stamp = Math.floor(Date.parse(datetime)/1000);
    const orgAbi = Organisation.abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    var address = await signer.getAddress();
    const contractOrg = new ethers.Contract("0x910775E150224bEe9ADDd4A519aCAB85eE22aa64", orgAbi, provider);
    const orgContract = contractOrg.connect(signer);
    goal = ethers.utils.parseEther(goal);
    var parameters = {
      gasLimit: 0x7a1200
    }
    var tx = await orgContract.addCampaign(name, goal, description, stamp, address, parameters);
    await tx.wait();
    window.location.replace('http://localhost:3000');
  };
  const onSubmit = e => {
    e.preventDefault();

    const user = {
      name: name,
      description: description,
      goal: goal,
      date: date,
      time: time
    };
  }
  const reset = () => {
    setName('');
    setGoal('');
    setDescription('');
    setDate('');
    setTime('');
    setSpinner(false);
  }
  return (
    <div className="login">
      <div className="outer">
        <div className="inner2">
    <Form>
      <h2 style={{color: "purple"}}> Hi (name), welcome back! </h2>
      <FormGroup className="mt-2">
        <Label for="exampleEmail">Campaign name:</Label>
        <Input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="form-control form-control"
        placeholder="Enter campaign name"
        required />
      </FormGroup>
      <FormGroup className="mt-2">
        <Label for="exampleText">Campaign description:</Label>
        <Input type="textarea" name="text" id="exampleText" value={description} onChange={e => setDescription(e.target.value)}/>
      </FormGroup>
      <FormGroup className="mt-2">
        <Label for="exampleNumber">Campaign goal</Label>
        <Input type="number" name="amount" min={0.0} id="amount" step='0.1' placeholder="0.00" value={goal}
        onChange={e => setGoal(e.target.value)}/>   
      </FormGroup>
      <FormGroup className="mt-2">
        <Label for="exampleDate">Date</Label>
        <Input
          type="date"
          name="date"
          value={date}
          id="exampleDate"
          placeholder="date placeholder"
          onChange={e => {setDate(e.target.value);}}
        />
      </FormGroup>
      <FormGroup className="mt-2">
        <Label for="exampleTime">Time</Label>
        <Input
          type="time"
          name="time"
          value={time}
          id="exampleTime"
          placeholder="time placeholder"
          onChange={e => setTime(e.target.value)}
        />
      </FormGroup>
      <FormGroup className="mt-2">
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
      </FormGroup>
    </Form>
    <div className="text-center">
    {spinner && <Spinner color="primary" children=""/>}
    <button onClick={e => {setSpinner(true); addCampaign(name, goal, description, date, time).then(reset);
    }} className="btn btn-dark btn-block btn-normal mt-3">ADD CAMPAIGN</button>
    </div>
  </div>
  </div>
  </div>
  );
}

export default Member;
