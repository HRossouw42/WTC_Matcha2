import React from 'react';
import { Link, render } from 'react-router-dom';
import Carousel from './Carousel';

import { accountService } from '@/_services';

function Details({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  // TODO: send props to Carousel for images

  return (
    <div>
      <h1> {user.first_name}'s Profile</h1>
      <p>
        <strong>Name: </strong> {user.title} {user.first_name} {user.last_name}
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
      <div>
        <Link to={`${path}/update`}>Update Profile</Link>
        <div className='w-50 mx-auto'>
          <Link to={`${path}/image`}>Update Photos</Link>
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export { Details };
