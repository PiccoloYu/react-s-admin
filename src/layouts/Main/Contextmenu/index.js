import React, { Component } from 'react';

class Contextmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _visible: '',
      _X: '',
      _Y: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    prevState._visible = nextProps.visible;
    prevState._X = nextProps.X;
    prevState._Y = nextProps.Y;
    return null;
    // 没错，这是一个static
  }


  rowClick = (e) => {
    let target = e.target;
    while (!target.dataset.value) {
      return false;
    }
    const val = target.dataset.value;
    this.props.clickValue(val);
  }

  render() {
    const { _visible, _X, _Y } = this.state;
    return (
      <ul
        className="contextmenu"
        onClick={this.rowClick}
        style={{
          display: `${_visible ? '' : 'none'}`,
          left: `${_X + 'px'}`,
          top: `${_Y + 'px'}`
        }}
      >
        {this.props.children}
      </ul >
    );
  }
}

export default Contextmenu;