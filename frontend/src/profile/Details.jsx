import React, { useState, useEffect } from 'react';
import { Link, render } from 'react-router-dom';
import Carousel from './Carousel';

import { accountService } from '@/_services';

function Details({ match }) {
  const { path } = match;

  const initialValues = {
    first_name: '',
    last_name: '',
    id: '',
    age: '',
    email: '',
    fame: '',
    gender: '',
    orientation: '',
    smoking: '',
    drinking: '',
    religion: '',
    pets: '',
    children: '',
    bio: '',
  };

  const userStart = accountService.userValue;
  const [user, setUser] = useState(userStart);

  useEffect(() => {
    async function fetchData() {
      let userValues = await accountService.userValue;
      accountService.getById(userValues.id).then((data) => {
        setUser(data);
      });
    }

    fetchData();
  }, []);

  // TODO: send props to Carousel for images

  return (
    <div>
      <h1> {user.first_name}'s Profile</h1>
      <p>
        <strong>Name: </strong> {user.first_name} {user.last_name}
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
        <strong>Smoking: </strong> {user.smoking ? 'Yes' : 'No'}
        <br />
        <strong>Drinking: </strong>
        {user.drinking ? 'Yes' : 'No'}
        <br />
        <strong>Religious: </strong>
        {user.religion ? 'Yes' : 'No'}
        <br />
        <strong>Pets: </strong>
        {user.pets ? 'Yes' : 'No'}
        <br />
        <strong>Children: </strong> {user.children ? 'Yes' : 'No'}
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
