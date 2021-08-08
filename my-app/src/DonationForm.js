import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText,
  InputGroupButtonDropdown, DropdownMenu, DropdownToggle , DropdownItem, ButtonDropdown, Dropdown, Spinner} from 'reactstrap';



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
  const [spinner, setSpinner] = useState(false);
  var token ="";
  const loading = props.campaignProps.home.state.loading;
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

  const tokenList = () => {
    var tokens = props.campaignProps.home.tokensDict;
    var content = [];
    for (var [key,value] of Object.entries(tokens)) {
      content.push(<DropdownItem onClick={handleCurrencyChange}>
        {key}</DropdownItem>)
    }
    return content;
  }
  console.log(!loading);
  console.log(modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>Donate</Button>
      <Modal isOpen={modal & !loading} toggle={toggle} className={className}>
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
                  <DropdownMenu  style={{ maxHeight: "150px", overflow:"scroll"}}>
                    <DropdownItem onClick={handleCurrencyChange}>ETH</DropdownItem>
                    {tokenList()}
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
          {spinner && <Spinner color="primary" children=""/>}
          <Button color="primary" disabled={!email | !amount | spinner} onClick={() => {props.campaignProps.home.donate(props.campaignProps.id, amount, email, currency);
                    console.log(loading);
                    console.log(modal);
                    setSpinner(true);}}>Donate</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;