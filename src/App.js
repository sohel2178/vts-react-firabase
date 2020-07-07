import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROUTES from "./components/constant/router";
import Navigation from "./components/navigation";
import LangingPage from "./components/landing";
import SignUpPage from "./components/signup";
import LoginPage from "./components/login";
import PasswordForgetPage from "./components/password-forget";
import HomePage from "./components/home";
import UserListPage from "./components/userslist";
import AccountPage from "./components/account";
import AdminPage from "./components/admin";
import "./App.css";
import { withAuthentication } from "./components/session";
import DevicePage from "./components/devices";

import { tableIcons, DataTableContext } from "./components/data-table";
// Rejohn Added
import themeFile from "./theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import HomeLayout from "./components/Homepage/";
import NotFound from "./components/notfound";
import UserHome from "./components/Users/UserHome";
import UserDevices from "./components/Users/UserDevices";
import VehicleLocation from "./components/Users/VehicleLocation";
import UserDeviceDetails from "./components/Users/UserDeviceDetails";
import UserAccount from "./components/Users/UserAccount";
import DriverAccount from "./components/Users/DriverAccount";
import {
  Template,
  AppScreeenshoot,
  Question,
  OurTeam,
  Testimonial
} from "./components/webtemplates";

const theme = createMuiTheme(themeFile);

const App = props => {
  // console.log(props.user, " From App");
  // const renderContent = (props.user.is_admin) ? (
  //   'Admin is True'
  // ) : (
  //   'Admin is False'
  // );
  return !props.user ? (
    <MuiThemeProvider theme={theme}>
      {/* <DataTableContext.Provider value={tableIcons}> */}
      <Router>
        <Switch>
          <Route exact path="/" component={HomeLayout} />
          <Route exact path="/signin" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route
            exact
            path={ROUTES.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route component={HomeLayout} />
        </Switch>
      </Router>
      {/* </DataTableContext.Provider> */}
    </MuiThemeProvider>
  ) : props.user.is_admin ? (
    <MuiThemeProvider theme={theme}>
      <DataTableContext.Provider value={tableIcons}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomeLayout} />
            <Route
              exact
              path={ROUTES.HOME}
              render={() => <HomePage userInfo={props.user} />}
            />
            <Route
              exact
              path={ROUTES.USERSLIST}
              render={() => <UserListPage userInfo={props.user} />}
            />
            <Route
              exact
              path={ROUTES.DEVICES}
              render={() => <DevicePage userInfo={props.user} />}
            />
            <Route
              exact
              path={ROUTES.TEMPLATE}
              render={() => <Template userInfo={props.user} />}
            />
            <Route
              exact
              path={ROUTES.APPSCREENSHOOT}
              render={() => <AppScreeenshoot userInfo={props.user} />}
            />
            <Route
              exact
              path={ROUTES.QUESTION}
              render={() => <Question userInfo={props.user} />}
            />
            <Route
              exact
              path={ROUTES.TEAM}
              render={() => <OurTeam userInfo={props.user} />}
            />
            <Route
              exact
              path={ROUTES.TESTIMONIAL}
              render={() => <Testimonial userInfo={props.user} />}
            />
            <Route render={() => <HomePage userInfo={props.user} />} />
          </Switch>
        </Router>
      </DataTableContext.Provider>
    </MuiThemeProvider>
  ) : (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeLayout} />
          <Route
            exact
            path={ROUTES.USERHOME}
            render={() => <UserHome userInfo={props.user} />}
          />
          <Route
            exact
            path={ROUTES.USERDEVICES}
            render={() => <UserDevices userInfo={props.user} />}
          />
          <Route
            exact
            path={ROUTES.USERPROFILE}
            render={() => <UserAccount userInfo={props.user} />}
          />
          <Route
            exact
            path="/location/:id"
            render={() => <VehicleLocation userInfo={props.user} />}
          />
          <Route
            exact
            path="/vehicle/:id"
            render={() => <UserDeviceDetails userInfo={props.user} />}
          />
          <Route
            exact
            path="/vehicle/edit/:id"
            render={() => <DriverAccount userInfo={props.user} />}
          />
          <Route render={() => <UserHome userInfo={props.user} />} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );

  {
    /* <Router>
        <Switch>
          {!props.user ? (
            <Fragment>
              <Route exact path="/" component={HomeLayout} />
              <Route exact path="/signin" component={LoginPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              <Route component={HomeLayout} />
            </Fragment>
          ): (
            (props.user.is_admin)?(
              <Fragment>
                {/* <Route exact path={ROUTES.HOME} render={() => <HomePage userInfo={props.user} /> }/>
                <Route exact path={ROUTES.USERSLIST} render={() => <UserListPage userInfo={props.user} /> } />
                <Route exact path={ROUTES.DEVICES} render={() => <DevicePage userInfo={props.user} /> }/>

                <Route render={() => <NotFound userInfo={props.user} /> }/>
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} /> 
                </Fragment>
                ):(
                  <Fragment>
                    
                    {/* <Route render={() => <NotFound userInfo={props.user} /> }/> 
                  </Fragment>
                )
                
              )}
              
              
              {/* <Navigation user={props.user} /> 
                
            </Switch>
          </Router> */
  }

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

export default withAuthentication(App);
