import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import {
  getToken,
  //removeToken
} from "../../utlis/auth";

function PrivateRoute({ children, ...rest }) {
  let hasToken = getToken();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasToken ? (
          <Redirect
            to={{
              pathname: "/app/home",
              state: { from: location }
            }}
            push
          />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default PrivateRoute;