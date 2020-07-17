import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';

function Details({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  return (
    <div>
      <h1> {user.first_name}'s Profile</h1>
      <p>
        <strong>Name: </strong> {user.first_name} {user.last_name}
        <br />
        <strong>Age: </strong> {user.age}
        <br />
        <strong>Location: </strong> {user.location}
        <br />
        <strong>Email: </strong> {user.email}
        <br />
      </p>
      <p style={{ textTransform: 'capitalize' }}>
        <strong>Gender: </strong> {user.gender}
        <br />
        <strong>Orientation: </strong> {user.orientation}
        <br />
      </p>
      <p style={{ textTransform: 'capitalize' }}>
        <strong>Smoking: </strong> {user.smoking}
        <br />
        <strong>Drinking: </strong>
        {user.drinking}
        <br />
        <strong>Religious: </strong>
        {user.religion}
        <br />
        <strong>Pets: </strong>
        {user.pets}
        <br />
        <strong>Children: </strong> {user.children}
      </p>
      <p>
        <strong>Bio: </strong>
        <br />
        {user.bio}
      </p>
      <p>
        <Link to={`${path}/update`}>Update Profile</Link>
      </p>
    </div>
  );
}

export { Details };
