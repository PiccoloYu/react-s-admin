import React, { Component } from 'react';
import MyBreadcrumb from "./Breadcrumb";
import { connect } from "react-redux";
import { Icon, Avatar, Dropdown, Menu } from 'antd';
import { withRouter } from "react-router-dom";
import { isMatchedlist, isOpen } from "../../redux/action/app";
import { isLogout } from "../../redux/action/useraction";
// import path from "path";
import config from "../../config";
import "./header.less";



class Header extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      Breadlist: '',
    };
    this.getBreadcrumb = this.getBreadcrumb.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    const { pathname } = this.props.location;
    this.getBreadcrumb(pathname);
  }


  getSnapshotBeforeUpdate(prevProps, prevState) {
    return 'foo';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(snapshot)
  }

  componentDidMount() {
    this.props.history.listen(route => {
      this.getBreadcrumb(route.pathname);
    })
  }

  toggleCollapsed = () => {
    /*this.setState({
      collapsed: !this.state.collapsed,
    });*/
    const { openAside } = this.props;
    this.props.isOpen(!openAside);
  };

  getBreadcrumb(route) {
    const { router } = config;
    const nameMap = new Map();
    router.forEach((item) => {//dfs 深度优先搜索
      nameMap.set(item.path, item.title);
      if (item.children) {
        item.children.forEach((child) => {
          // let childpath = path.join(item.path, child.path)
          nameMap.set(child.path, child.title);
        })
      }
    })

    let matched = [];
    let matchedlist = [];
    let a = route.split('/');
    if (a.length > 3) {
      matched.push('/' + a[1] + '/' + a[2]);
      matched.push('/' + a[3]);
    } else {
      matched.push('/' + a[1] + '/' + a[2]);
    }

    if (route !== '/app/home') {
      matched = ['/app/home'].concat(matched);
    };

    for (let i = 0; i < matched.length; i++) {
      let name = nameMap.get(matched[i]);
      let item = {
        path: matched[i],
        name: name
      }
      matchedlist.push(item);
    }
    this.props.isMatchedlist(matchedlist);
  }

  handleMenuClick(e) {
    switch (e.key) {
      case 'logout':
        this.props.isLogout();
        return;
      default:
        break;
    }
  }

  render() {
    const { matchedlist, openAside, fields } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="header">
        <div className="logo">
          <span><h1>Admin</h1></span>
          <Icon onClick={this.toggleCollapsed} type={`${openAside ? 'pic-right' : 'pic-left'}`} />
        </div>
        <div className="right-nav">
          <MyBreadcrumb matchedlist={matchedlist} />
          <div className="Avatar">
            <Avatar className="img" style={{ backgroundColor: '#87d068' }} icon="user" />
            <Dropdown overlay={menu}>
              <span className="ant-dropdown-link username" >
                {fields.username.value}
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    matchedlist: [...state.matchedlist],
    openAside: state.openAside,
    fields: state.fields
  }
}

export default connect(
  mapStateToProps,
  {
    isMatchedlist,
    isOpen,
    isLogout
  }
)(withRouter(Header));