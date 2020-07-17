import React from 'react';
import { Link, render } from 'react-router-dom';
import Carousel from './Carousel';

import { accountService } from '@/_services';

function Details({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  return (
    <div>
      <h1> {user.firstName}'s Profile</h1>
      <p>
        <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}
        <br />
        <strong>Age: </strong> {user.age}
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
        <div className='w-50 mx-auto'>
          <Carousel />
        </div>
      </p>
    </div>
  );
}

export { Details };
