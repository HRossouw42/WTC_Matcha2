import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { UsersList } from './usersList';

function Search({ match }) {
  const { path } = match;

  return (
    <div className='p-4'>
      <div className='container'>
        <Switch>
          <Route exact path={path} component={UsersList} />
        </Switch>
      </div>
    </div>
  );
}

export { Search };
