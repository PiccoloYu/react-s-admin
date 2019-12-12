import React, { Component } from 'react';
import { Tabs } from 'antd';
import path from 'path';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import history from "../../../utlis/history";

// import Appmain from "../app-main";
import {
  isVisitedTabs,
  isAddTabs,
  isCurrent,
  isDelTabs,
  isRefresh,
  isOther,
  isAll,
  isLeft,
  isRight,
  isWhether
} from "../../../redux/action/tabaction";
import Contextmenu from "../Contextmenu";
import ContextmenuItem from "../ContextmenuItem";
const { TabPane } = Tabs;


class Mytabs extends Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      visitedTabs: '',
      menulist: [
        { icon: '', title: '刷新', value: 'Refresh' },
        { icon: '', title: '关闭其他', value: 'Other' },
        { icon: '', title: '关闭全部', value: 'All' },
        { icon: '', title: '关闭左侧', value: 'Left' },
        { icon: '', title: '关闭右侧', value: 'Right' }
      ],
      homemenulist: [
        { icon: '', title: '刷新', value: 'Refresh' },
        { icon: '', title: '关闭全部', value: 'All' }
      ],
      contentmenuX: '',
      contentmenuY: '',
      visible: false,
      tagName: '',
    };
    this.onTabClick = this.onTabClick.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.clickValue = this.clickValue.bind(this);
    this.initTabs();
    this.addTabs();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    prevState.visitedTabs = nextProps.visitedTabs;
    return null;
    // 没错，这是一个static
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return 'foo';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(snapshot)
  }

  componentDidMount() {
    const { pathname } = history.location;
    this.props.isCurrent(pathname);
    history.listen(route => {
      if (route.pathname.indexOf("/redirect") === -1) {// 未找到 返回-1
        this.props.isCurrent(route.pathname);
        this.addTabs(route);
      }
    })
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.visible) {
      document.body.addEventListener('click', this.closeMenu);
    } else {
      document.body.removeEventListener('click', this.closeMenu);
    }
    return true;
  }

  closeMenu() {
    this.setState({
      visible: false
    })
  }

  addTabs = (route) => {
    const { Routers } = this.props;
    let pathname = '';
    if (!route) {
      pathname = history.location.pathname;
    } else {
      pathname = route.pathname;
    }
    // const { pathname } = this.props.location.pathname;
    if (pathname !== '/' && pathname !== '/app/404') {
      let current = '';
      for (let i = 0; i < Routers.length; i++) {
        if (typeof (Routers[i].children) === 'undefined') {
          if (Routers[i].path === pathname) {
            current = {
              fullPath: Routers[i].path,
              path: Routers[i].path,
              name: Routers[i].name,
              title: Routers[i].title,
              key: Routers[i].key,
              closable: Routers[i].closable ? true : false
            };
          }
        } else {
          for (let j = 0; j < Routers[i].children.length; j++) {
            let _thispath = path.join(Routers[i].path, Routers[i].children[j].path);
            if (_thispath === pathname) {
              current = {
                fullPath: _thispath,
                path: _thispath,
                name: Routers[i].children[j].name,
                title: Routers[i].children[j].title,
                key: Routers[i].children[j].key,
                closable: Routers[i].children[j].closable ? true : false
              };
            }
          }
          //const tempTags = this.filterAffixTags(Routers[i].children.path, Routers[i].path);
          /*if (tempTags.length >= 1) {
            current = [...current, ...tempTags];
          }*/
        }
      }
      const { visitedTabs } = this.props;

      if (current) {
        this.props.isAddTabs(current);
        if (visitedTabs.some(v => v.fullPath === current.fullPath)) {
          this.props.isWhether(false)
        } else {
          this.props.isWhether(true)
        }
      }
    }
  };

  filterAffixTags = (routes, basePath = '/') => {
    let tags = [];
    routes.forEach(route => {
      if (route.affix) {
        const tagPath = path.resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          title: route.title,
          key: route.key,
          closable: route.closable ? true : false
        })
      }
      if (route.children) {
        const tempTags = this.filterAffixTags(route.children, route.path);
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags];
        }
      }
    });

    return tags;
  }

  initTabs = () => {
    const { Routers } = this.props;
    const affixTags = this.filterAffixTags(Routers);
    for (const tab of affixTags) {
      if (tab.name) {
        this.props.isVisitedTabs(tab);
      }
    }
  }

  onTabClick(key) {
    history.push(key);
  }


  onEdit(targetKey, action) {
    switch (action) {
      case 'remove':
        this.props.isDelTabs(targetKey);
        /*new Promise((resolve, reject) => {
          const { visitedTabs } = this.props;
          this.props.isDelTabs(targetKey);
          resolve({
            visitedViews: [...visitedTabs],
            delViewName: targetKey
          });
        }).then(({ visitedViews, delViewName }) => {
          if (this.isActive(delViewName)) {
            this.toLastView(visitedViews, delViewName);
          }
        })*/
        break;
      default:
        break;
    }
  }

  isActive(route) {
    const { pathname } = this.props.location;
    return route === pathname;
  }

  toLastView(visitedViews, view) {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView) {
      this.props.history.push(latestView.fullPath);
    } else {
      // now the default is to redirect to the home page if there is no tags-view,
      // you can adjust it according to yo8ur needs.
      this.props.history.push('/');
    }
  }

  openMenu(e) {
    let target = e.target;
    let flag = false;
    if (typeof (target.className) !== 'object') {
      if (target.className.indexOf('ant-tabs-tab') > -1) {
        if (target.className.indexOf('ant-tabs-tab-unclosable') > -1) {
          target = target.parentNode;
        }
        flag = true;
      } else if (target.parentNode.className.indexOf('ant-tabs-tab') > -1) {
        target = target.parentNode;
        flag = true;
      }
    }
    if (flag) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        contentmenuX: e.clientX,
        contentmenuY: e.clientY,
        tagName: target.parentNode.dataset.name,
        visible: true
      });
    }
  }

  clickValue(val) {
    const { tagName } = this.state;
    switch (val) {
      case 'Refresh':
        this.props.isRefresh(tagName);
        break;
      case 'Other':
        this.props.isOther(tagName);
        break;
      case 'All':
        this.props.isAll(tagName);
        break;
      case 'Left':
        this.props.isLeft(tagName);
        break;
      case 'Right':
        this.props.isRight(tagName);
        break;
      default:
        break;
    }
  }

  renderTabBar = (props, DefaultTabBar) => {
    return (
      <DefaultTabBar {...props} >
        {node => (
          <span key={node.key} className="MyTabs" data-name={node.key}>
            {node}
          </span>
        )}
      </DefaultTabBar>
    )
  }

  render() {
    const { visitedTabs, _thisCurrent } = this.props;
    const { menulist, homemenulist, visible, contentmenuY, contentmenuX, tagName } = this.state;
    return (
      <div
        onContextMenu={e => this.openMenu(e)}
        className="mytab"
      >
        <Tabs
          hideAdd
          animated={true}
          activeKey={_thisCurrent}
          type="editable-card"
          onEdit={this.onEdit}
          onTabClick={this.onTabClick}
          renderTabBar={this.renderTabBar}
        >
          {visitedTabs.map(pane => (
            <TabPane tab={pane.title} key={pane.path} name={pane.path} closable={pane.closable} >
              {/* <Appmain />*/}
            </TabPane>
          ))}
        </Tabs>
        <Contextmenu
          clickValue={this.clickValue}
          visible={visible}
          X={contentmenuX}
          Y={contentmenuY}
        >
          <ContextmenuItem menulist={tagName === '/app/home' ? homemenulist : menulist} />
        </Contextmenu>
      </div >
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    visitedTabs: state.visitedTabs,
    Routers: state.Routers,
    _thisCurrent: state._thisCurrent,
  }
}

export default connect(
  mapStateToProps,
  {
    isVisitedTabs,
    isAddTabs,
    isCurrent,
    isDelTabs,
    isRefresh,
    isOther,
    isAll,
    isLeft,
    isRight,
    isWhether
  }
)(withRouter(Mytabs));

