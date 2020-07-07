import React from 'react';
import {withFirebase} from '../firebase';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../constant/router';
import { ListItem, Button } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const styles = (theme) => ({
    root: {},
    item: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0
    },
    button: {
    //   color: colors.blueGrey[800],
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
      fontWeight: theme.typography.fontWeightMedium
    },
    icon: {
      color: theme.palette.icon,
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(1)
    },
   
  });


class Logout extends React.Component {
    state = {  }

    logoutHandler = ()=>{
        this.props.firebase.doSignOut();
        this.props.history.push(ROUTES.LANDING)
    }

    render() { 
        const {classes} = this.props;
        return (
            <ListItem
                className={classes.item}
                disableGutters
                key='Logout'
            >
                <Button
                    // activeClassName={classes.active}
                    className={classes.button}
                    onClick={this.logoutHandler}
                    // component={CustomRouterLink}
                    // to={page.href}
                >
                    <div className={classes.icon}><LockOpenIcon /></div>
                    Sign Out
                </Button>
            </ListItem>

            // <Grid item>
            // {/* <Button onClick={this.props.firebase.doSignOut} color="secondary"> Sign Out</Button> */}
            //     <Button onClick={this.logoutHandler} color="secondary"> Sign Out</Button>
            // </Grid>
        );
    }
}
export default withFirebase(withRouter(withStyles(styles)(Logout)));

// const Logout = ({firebase}) => {
//     return ( 
//         <Grid item>
//             {/* <Button onClick={firebase.doSignOut} color="secondary"> Sign Out</Button> */}
//         </Grid>
//      );
// }
 
// export default withFirebase(Logout);