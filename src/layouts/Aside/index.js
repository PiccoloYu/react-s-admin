import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from "react-redux";
import { isOpen } from "../../redux/action/app";
import config from "../../config";
import Item from "./SubMenuItem/Item";
import path from 'path';
import "./aside.less";
import {
  Link
} from "react-router-dom";

const { SubMenu } = Menu;

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  toggleCollapsed = () => {
    /*this.setState({
      collapsed: !this.state.collapsed,
    });*/
    const { openAside } = this.props;
    this.props.isOpen(!openAside);
  };

  handleClick = e => {
    // const { visitedViews } = this.props;
    // console.log(visitedViews)
    /*this.setState({
      current: e.key,
    });*/
  };


  render() {
    const { openAside, _thisCurrent } = this.props;
    const { router } = config;
    let item = [];
    item.push(_thisCurrent)
    return (
      <div className={`aside ${openAside ? 'asideclose' : 'asideopen'}`}>
        <section className="aside-menu-inner">
          <Menu
            onClick={this.handleClick}
            className="myMenu"
            selectedKeys={item}
            mode="inline"
            theme="light"
            inlineCollapsed={openAside}
          >
            {router.map((item) => {
              if (!item.show) {
                return false;
              }
              if (typeof (item.children) !== 'undefined') {
                return (
                  <SubMenu
                    key={item.path}
                    title={
                      <Item path='' title={item.title} icon={item.icon} />
                    }
                  >
                    {item.children.map((children) => {
                      let childrenpath = path.join(item.path, children.path);
                      return (
                        <Menu.Item key={childrenpath}>
                          <Link to={childrenpath}>
                            <span>{children.title}</span>
                          </Link>
                        </Menu.Item>
                      )
                    })}
                  </SubMenu>
                )
              }
              return (
                <Menu.Item key={item.path} >
                  <Item path={item.path} icon={item.icon} title={item.title} />
                </Menu.Item>
              )
            })}
          </Menu>
        </section>
        <div className="but" onClick={this.toggleCollapsed}>
          <Icon type={openAside ? 'right' : 'left'} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    openAside: state.openAside,
    _thisCurrent: state._thisCurrent,
    device: state.device
  }
}

export default connect(
  mapStateToProps,
  { isOpen }
)(Aside);