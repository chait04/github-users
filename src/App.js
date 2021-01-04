import React from "react";
// import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <PrivateRoute exact path="/" component={Dashboard} />
//         <Route path="/login" component={Login} />
//         <Route path="*" component={Error} />
//       </Switch>
//     </Router>
//   );
// }

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact={true}>
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="*">
            <Error></Error>
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
