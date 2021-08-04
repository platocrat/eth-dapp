import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';



const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(0)

  const toggle = () => setModal(!modal);
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
    console.log(props)
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{props.name}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Donation amount</Label>
                <InputGroup>
                <InputGroupAddon addonType="prep end">
                  <InputGroupText>ETH</InputGroupText>
                </InputGroupAddon>
              <Input type="number" name="amount" min={0.0} id="amount" step='0.1' placeholder="0.00" onChange={handleAmountChange}/>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="email">Get notified about the outcome of {props.name}</Label>
              <Input type="email" name="email" id="email" placeholder="example@acme.com" onChange={handleEmailChange}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.campaignProps.home.donate(props.campaignProps.id, amount, email, 'pimpek')}>Donate</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;