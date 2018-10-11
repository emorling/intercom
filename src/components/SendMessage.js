import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { IntercomAPI } from 'react-intercom';
import PropTypes from 'prop-types';

export default class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.state = {
      message: '-',
    };
  }

  onSendMessage(e){
    this.props.sendMessage(this.state.message);
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form >
              <FormGroup>
                <Label for="Message">Event name</Label>
                <Input 
                type="text" 
                name="Message" 
                id="Message" 
                placeholder="Message"
                value={this.state.message} 
                onChange={e => this.setState({ message: e.target.value })}/>
              </FormGroup>
              <Button onClick={this.onSendMessage}>Send message</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      );
  }
}

SendMessage.propTypes = {
  SendMessage: PropTypes.func
};
