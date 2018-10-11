import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { IntercomAPI } from 'react-intercom';
import PropTypes from 'prop-types';

export default class SendEvent extends Component {
  constructor(props) {
    super(props);
    this.onSendEvent = this.onSendEvent.bind(this);
    this.state = {
      eventName: 'PING',
    };
  }

  onSendEvent(e){
    this.props.sendEvent(this.state.eventName);
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
                <Label for="EventName">Event name</Label>
                <Input 
                type="text" 
                name="EventName" 
                id="EventName" 
                placeholder="EventName"
                value={this.state.eventName} 
                onChange={e => this.setState({ eventName: e.target.value })}/>
              </FormGroup>
              <Button onClick={this.onSendEvent}>Send event</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      );
  }
}

SendEvent.propTypes = {
  sendEvent: PropTypes.func
};
