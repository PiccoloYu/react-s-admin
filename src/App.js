import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from "react-redux";
import todoApp from "./redux/reducer";
import history from "./utlis/history";
import {
  Switch,
  Route
} from "react-router-dom";
import Layouts from "./layouts";
import Login from "./view/Login&Register";
import NotFound from "./view/404";
import './App.less';
import {
  Router
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import {
  getToken,
  //removeToken
} from "./utlis/auth";
let store = createStore(todoApp);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    let hasToken = getToken();
    if (hasToken) {
      history.push('/app/home')
    } else {
      history.push('/login')
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" />
            {/*<Route exact path="/" render={() =>
                <Redirect to="/app/home" push />}
              />*/}
            <Route path="/app" component={Layouts} />
            <Route path="/404" component={NotFound} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
