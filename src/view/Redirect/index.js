import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import history from "../../utlis/history";

class Redirect extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    const { path } = this.props.match.params;
    let mypath = '/' + path;
    history.push(mypath);
  }

  render() {
    return (
      <span>刷新中</span>
    );
  }
}

export default withRouter(Redirect);