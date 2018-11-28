import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Booking from './components/Booking';


const Routes = () => (
    <Switch>
        <Route path='/home' component={Booking} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Redirect path="/" to="/home" />
    </Switch>
);

export default Routes;
