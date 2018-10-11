import React, { Component } from 'react';
import Layout from './Layout';
import SetUser from '../components/SetUser';
import SendEvent from '../components/SendEvent';
import SendMessage from '../components/SendMessage';
import IntercomWidget from '../components/IntercomWidget';
import { IntercomAPI } from 'react-intercom';
import 'bootstrap/dist/css/bootstrap.min.css';

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
export default class App extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      user_id: 0, // ,
	      email: 'johns.doe@example.com',
	      name: 'Anonymous',
	    };
    	this.setUser = this.setUser.bind(this);
    	this.setRandomUserId = this.setRandomUserId.bind(this);
    	this.sendEvent = this.sendEvent.bind(this);
    	this.sendMessage = this.sendMessage.bind(this);
	  }

	setUser(user_data){
		const self = this;
		fetch('/setUser', {
			method: 'POST',
		    headers: {
		    	'Content-Type': 'application/json',
        		'Accept': 'application/json'
		    },
		    body: JSON.stringify({
		    	email: user_data.email
		    })
		 }).then(function(response){
		 	return response.json();
		 }).then(function(responseData){
			 	console.log('responseData', responseData);
			 	user_data.user_id = responseData.user_id;
			 	self.setState(user_data);
		 	});

		
	}
	setRandomUserId(){
		this.setState({user_id: Math.random() * (Number.MAX_SAFE_INTEGER)});
	}

	sendEvent(evt){
		// console.log(evt);
		// IntercomAPI('trackEvent', evt);
		const self = this;
		fetch('/createEvent', {
			method: 'POST',
		    headers: {
		    	'Content-Type': 'application/json',
        		'Accept': 'application/json'
		    },
		    body: JSON.stringify({
		    	userId: this.state.user_id,
		    	eventName: evt
		    })
		 }).then(function(response){
		 	return response.json();
		 }).then(function(responseData){
			 	//Intercom('shutdown');
				//Intercom('boot',window.intercomSettings );
				setTimeout(function(){ 
				  Intercom("update", {last_request_at: parseInt((new Date()).getTime()/1000)})
				}, 500)
		 	});
	}

	sendMessage(message){
		const self = this;
		fetch('/sendMessage', {
			method: 'POST',
		    headers: {
		    	'Content-Type': 'application/json',
        		'Accept': 'application/json'
		    },
		    body: JSON.stringify({
		    	userId: this.state.user_id,
		    	message: message
		    })
		 }).then(function(response){
		 	return response.json();
		 })
	}
  	render() {
	    return (
	      <Layout>
	      	<SetUser user={this.state} setUser={this.setUser} setRandomUserId={this.setRandomUserId}/>
	      	{this.state.user_id !== 0 && <div><hr/><SendEvent sendEvent={this.sendEvent}/><hr/><SendMessage sendMessage={this.sendMessage}/></div>}
	        <IntercomWidget user={this.state}/>
	      </Layout>
	    );
  	}
}
