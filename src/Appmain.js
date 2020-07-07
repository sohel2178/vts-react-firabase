import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import * as ROUTES from './components/constant/router';
import Navigation from './components/navigation';
import LangingPage from './components/landing';
import SignUpPage from './components/signup';
import LoginPage from './components/login';
import PasswordForgetPage from './components/password-forget';
import HomePage from './components/home';
import AccountPage from './components/account';
import AdminPage from './components/admin';
import './App.css';
import {withAuthentication} from './components/session';
import DevicePage from './components/devices';

import {tableIcons, DataTableContext} from './components/data-table';


const Appmain = props => {
  
    return(
    <DataTableContext.Provider value={tableIcons}>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
        </Switch>
        {/* <div>
          <Navigation user={props.user} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={LoginPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route
            path={ROUTES.HOME}
            render={() => <HomePage user={props.user} />}
          />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.DEVICES} component={DevicePage} />
        </div> */}
      </Router>
    </DataTableContext.Provider>
    )
  

  // return (
  //   <DataTableContext.Provider value={tableIcons}>
  //     <Router>
  //       <div>
  //         <Navigation user={props.user} />

  //         <Route exact path={ROUTES.LANDING}
  //           render={()=><LangingPage firebase={props.firebase} user={props.user}/>}
  //           />
  //         <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
  //         <Route path={ROUTES.SIGN_IN} component={LoginPage} />
  //         <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
  //         <Route
  //           path={ROUTES.HOME}
  //           render={() => <HomePage user={props.user} />}
  //         />
  //         <Route path={ROUTES.ACCOUNT} component={AccountPage} />
  //         <Route path={ROUTES.ADMIN} component={AdminPage} />
  //         <Route path={ROUTES.DEVICES} component={DevicePage} />
  //       </div>
  //     </Router>

  //   </DataTableContext.Provider>
  // );
};

export default withAuthentication (Appmain);
