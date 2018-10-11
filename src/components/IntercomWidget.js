import React, { Component } from 'react';
import Intercom from 'react-intercom';
import PropTypes from 'prop-types';

export default class IntercomWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user.user_id === 0) return (<div/>);

    return (
      <div className="app">
        <Intercom appID="dw3nalf3" { ...this.props.user } />
      </div>
    );

  }
}

IntercomWidget.propTypes = {
  user: PropTypes.object
};