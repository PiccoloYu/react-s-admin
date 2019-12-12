import React, { Component } from 'react';
import Header from "./Header";
import Aside from "./Aside";
import Main from "./Main";
import { isDevice, isOpen } from "../redux/action/app";
import { connect } from "react-redux";

const { body } = document;
const WIDTH = 992;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
    };
    this.props.history.listen(route => {
      const { device, openAside } = this.props;
      if (device === 'mobile' && openAside) {
        this.props.isOpen(true);
      }
    });
    this._resizeHandler = this._resizeHandler.bind(this);
  }

  componentDidMount() {
    this._resizeHandler();
    window.addEventListener('resize', this._resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler);
  }

  _isMobile() {
    const rect = body.getBoundingClientRect();// 方法返回元素的大小及其相对于视口的位置。
    return rect.width - 1 < WIDTH;
  }

  _resizeHandler() {
    //if (!document.hidden) {
    const isMobile = this._isMobile();
    this.props.isDevice(isMobile ? 'mobile' : 'desktop');
    if (isMobile) {
      this.props.isOpen(true);
    }
    //}
  }

  render() {

    return (
      <div className={`layout ${this.props.device === 'mobile' ? 'mobile' : ''}`}>
        <Header />
        <Aside />
        <Main />
      </div >
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    device: state.device,
    openAside: state.openAside
  }
}


export default connect(
  mapStateToProps,
  {
    isDevice,
    isOpen
  }
)(Layout);