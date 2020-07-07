import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from './components/constant/router';
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

import HomeLayout from './components/Homepage/';
import Appmain from './Appmain';


class App extends React.Component {
  state = {
    goLogin:  false
  }
  loginHander = ()=>{
    this.setState({
      goLogin: true
    })
  }
  render() {
    // console.log(this.state.goLogin) 
    // return this.state.goLogin ? (<Appmain />) : (<HomeLayout goLogin={this.loginHander}/>);
    // // return ( 
    // //   <HomeLayout goLogin={this.loginHander}/>
    // // );
  }
 


 

  // return props.user ? (
  //   <DataTableContext.Provider value={tableIcons}>
  //     <Router>

  //       <div>
  //         <Navigation user={props.user} />
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
  // ) : (
  //     <HomeLayout />
  // );
  

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

export default withAuthentication (App);
