import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import PropTypes from 'prop-types';

export default class SetUser extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onRandomUserId = this.onRandomUserId.bind(this);
    this.unCollapse = this.unCollapse.bind(this);
    this.state = {
      collapsed: false,
      user_id: this.props.user.user_id,
      email: this.props.user.email,
      created_at: 1234567890,
      name: this.props.user.name,
    };
  }

  componentWillReceiveProps(nextprops){
    this.setState({user_id: nextprops.user.user_id,
      email: nextprops.user.email,
      name: nextprops.user.name});
  }

  onFormSubmit(e){
    this.setState({collapsed: false});
    this.props.setUser(this.state);
    e.preventDefault();
    e.stopPropagation();

    // IntercomAPI('trackEvent', 'hello');
    /*
    import { Intercom } from 'intercom-client';
    var client = new Intercom.Client({ token: 'dG9rOmM1NWM0YjAyXzJhZjBfNDc3MV9iOTliXzZmODQwNGQxYzg3YToxOjA=' });
    client.admins.list(function(admins){

    console.log('admins',admins);
    });
    */
  }
  onRandomUserId(e){
    this.props.setRandomUserId();
    e.preventDefault();
    e.stopPropagation();
  }

  unCollapse(e){
    this.setState({collapsed: true});
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    if (!this.state.collapsed) {
      return (
        <Container>
            <Row>
              <Col>
                Hi {this.state.name} (ID: {this.state.user_id})! <br/>
                <Button color="secondary" onClick={this.unCollapse}>Set User</Button>
              </Col>
          </Row>
        </Container>
      );
    }
    return (
      <Container>
        <Row>
          <Col>
            <Form >
              <FormGroup>
                <Label for="user_id">user_id</Label>
                <InputGroup>
                  <Input 
                  type="text" 
                  name="user_id" 
                  id="user_id" 
                  placeholder="user_id"
                  value={this.state.user_id} 
                  onChange={e => this.setState({ user_id: e.target.value })}/>
                  <InputGroupAddon addonType="append"><Button onClick={this.onRandomUserId}>Random</Button></InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="Name"
                  value={this.state.name} 
                  onChange={e => this.setState({ name: e.target.value })}/>
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="E-mail"
                  value={this.state.email} 
                  onChange={e => this.setState({ email: e.target.value })}/>
              </FormGroup>
              <Button onClick={this.onFormSubmit}>Set User</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      );
  }
}
SetUser.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setRandomUserId: PropTypes.func
};
