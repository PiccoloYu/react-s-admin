import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

class FancyRout extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {};
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done()
  }

  render() {
    return (
      <Route {...this.props} />
    );
  }
}

export default FancyRout;