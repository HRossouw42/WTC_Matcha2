import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { UpdateEmail} from './UpdateEmail';

function Settings({ history, match }) {
  const { path } = match;

  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-8 offset-sm-2 mt-5">
                <div className="card m-3">
                    <Switch>
                        <Route path={`${path}`} component={UpdateEmail} />
                    </Switch>
                </div>
            </div>
        </div>
    </div>
);
}

export { Settings };
