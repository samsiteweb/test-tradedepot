import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isExpired, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (!isExpired ? (
      <Component {...props} />
    ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
    ))
    }
  />
);

export default withRouter(ProtectedRoute);
