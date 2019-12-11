import React, { Component } from 'react';
import MyRedirect from "../../../view/Redirect";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import history from "../../../utlis/history";
import { connect } from "react-redux";
import { isAnimat } from "../../../redux/action/app";
import config from "../../../config";
import FancyRout from "../../../components/FancyRout";
import path from "path";
import {
  Switch,
  Redirect,
  withRouter,
  //Route
} from "react-router-dom";

class AppMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastIndex: 0,
      nextIndex: 2, //当前路由index
      animationClass: ''
    };
  }

  componentDidMount() {
    const { location, visitedTabs } = this.props;
    let index = '';
    // let animationClass = '';
    for (let i = 0; i < visitedTabs.length; i++) {
      if (location.pathname === visitedTabs[i].path) {
        index = i + 1;
      }
    }
    this.setState({
      index: index
    })
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { location, visitedTabs } = this.props;
    let index = '';
    for (let i = 0; i < visitedTabs.length; i++) {
      if (location.pathname === visitedTabs[i].path) {
        index = i + 1;
      }
    }
    return index;//返回 当前的index
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // const { visitedTabs, whether } = this.props;
    let animationClass = 'forward';
    // console.log(snapshot === visitedTabs.length)
    /*if (whether) {
      animationClass = 'forward';//back
      prevState.lastIndex = snapshot;
    } else {
      animationClass = 'back';
      console.log(prevState.lastIndex)
    }*/

    if (animationClass) {
      this.props.isAnimat(animationClass);
    }
  }

  render() {
    const { location, animat } = this.props;
    const { router } = config;
    return (
      <div className="app-main">
        <TransitionGroup className={'router-wrapper'}>
          <CSSTransition
            timeout={500}
            classNames={animat}
            key={location.pathname}
            appear={true}
            unmountOnExit={true}
          >
            <Switch location={location}>
              {router.map((rou) => {
                if (rou.children) {
                  return rou.children.map((child) => {
                    let childrenpath = path.join(rou.path, child.path);
                    return (
                      <FancyRout key={child.path} path={childrenpath} component={child.component} />
                    )
                  })
                }
                return (
                  <FancyRout key={rou.path} {...rou} />
                )
              })
              }
              <FancyRout path="/app/redirect/:path*" component={MyRedirect} />
              <Redirect to="/app/404" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div >
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    visitedTabs: state.visitedTabs,
    animat: state.animat,
    whether: state.whether
  }
}

export default connect(
  mapStateToProps,
  {
    isAnimat
  }
)(withRouter(AppMain));