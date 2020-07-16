import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { UsersList } from './usersList';
import { publicProfile } from './publicProfile';

function Search({ match }) {
  const { path } = match;

  return (
    <div className='p-4'>
      <div className='container'>
        <Switch>
          <Route exact path={path} component={UsersList} />
          <Route path={`${path}/view/:id`} component={publicProfile} />
        </Switch>
      </div>
    </div>
  );
}

export { Search };
