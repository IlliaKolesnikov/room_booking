import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import Booking from './components/Booking';


const Routes = () => (
    <Switch>
        <Route exact path='/' component={Booking} />
        <Route path='/signin' component={SignIn} />
    </Switch>
);

export default Routes;
