import React, { Component } from 'react';
import { connect } from "react-redux";
import Mytabs from "./Mytabs";
import { isOpen } from "../../redux/action/app";
import "./main.less";

import Appmain from "./app-main";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getClass = this.getClass.bind(this);
    this.closeAside = this.closeAside.bind(this);
  }

  getClass() {
    const { device, openAside } = this.props;
    if (device === 'desktop' && openAside) {
      return 'mainleft'
    } else if (device === 'desktop' && !openAside) {
      return 'mainrigth'
    }
    return ' '
  }

  closeAside() {
    const { openAside } = this.props;
    this.props.isOpen(!openAside);
  }

  render() {
    const { device, openAside } = this.props;
    return (
      <div className={`main ${this.getClass()}`}>
        <Mytabs />
        <Appmain />
        <div
          className="drawer-bg"
          onClick={this.closeAside}
          style={{
            display: `${device === 'mobile' && !openAside ? 'block' : 'none'} `
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    openAside: state.openAside,
    device: state.device
  }
}

export default connect(
  mapStateToProps, {
  isOpen
}
)(Main);