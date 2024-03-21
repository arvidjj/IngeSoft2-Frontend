import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('user') !== null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            navigate("/")
        )
      }
    />
  );
};

export default ProtectedRoute;
