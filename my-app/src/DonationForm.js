import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText,
  InputGroupButtonDropdown, DropdownMenu, DropdownToggle , DropdownItem, ButtonDropdown, Dropdown} from 'reactstrap';



const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
  } = props;

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);
  var token ="";

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);

  const toggle = () => setModal(!modal);
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.textContent);
    console.log(currency);
    token = event.target.textContent;
  }


  return (
    <div>
      <Button color="primary" onClick={toggle}>Donate</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{props.name}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Donation amount</Label>
                <InputGroup>
                <Input type="number" name="amount" min={0.0} id="amount" step='0.1' placeholder="0.00" onChange={handleAmountChange}/>                
                  <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown}>
                  <DropdownToggle caret> {currency}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleCurrencyChange}>ETH</DropdownItem>
                    <DropdownItem onClick={handleCurrencyChange}>DAI</DropdownItem>
                    <DropdownItem onClick={handleCurrencyChange}>USDT</DropdownItem>
                    <DropdownItem onClick={handleCurrencyChange}>WETH</DropdownItem>
                  </DropdownMenu>
                  </InputGroupButtonDropdown>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="email">Enter your email</Label>
              <Input type="email" name="email" id="email" placeholder="example@acme.com" onChange={handleEmailChange}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.campaignProps.home.donate(props.campaignProps.id, amount, email, currency)}>Donate</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;