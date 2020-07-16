import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';
import { Search } from '@/search';
import geolocator from 'geolocator';

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});

  var options = {};

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));

    geolocator.locate(options, function (err, location) {
      console.log(err || location);
    });

    geolocator.locateByIP(options, function (err, location) {
      console.log(err || `City location is ${location.address.city}`);
      // console.log(`City location is ${location.address.city}`);
    });

    return subscription.unsubscribe;
  }, []);

  return (
    <div className={'app-container' + (user && ' bg-light')}>
      <Nav />
      <Alert />
      <Switch>
        <Redirect from='/:url*(/+)' to={pathname.slice(0, -1)} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/admin' roles={[Role.Admin]} component={Admin} />
        <Route path='/account' component={Account} />
        <PrivateRoute path='/search' component={Search} />
        <Redirect from='*' to='/' />
      </Switch>
    </div>
  );
}

export { App };
