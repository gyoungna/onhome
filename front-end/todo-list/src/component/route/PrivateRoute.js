import { Route, Redirect } from 'react-router';

function PrivateRoute ({component: Component, ...parentProps}) {

    return (
      <Route
      {...parentProps}
      render={props => (
        localStorage.getItem('auth')? (
         <Component {...props}/>
        ) : (
         <Redirect to="/main"/>
        )
      )}
    />
        );
  
}
export default PrivateRoute;