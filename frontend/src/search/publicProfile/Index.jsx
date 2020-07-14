import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';

function publicProfile({ history, match }) {
  const { id } = match.params;

  const viewer = accountService.userValue;

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const [user, setUser] = useState(initialValues);

  useEffect(() => {
    // get user and set form fields
    accountService.getById(id).then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <div>
      <h1> {user.firstName}'s Public Profile</h1>
      <p>
        <strong>Name: </strong> {user.title} {user.firstName} {user.lastName}
        <br />
        <strong>Age: </strong> {user.age}
        <br />
        <strong>Email: </strong> {user.email}
        <br />
      </p>
      <p>
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
      <p>Like button?</p>
    </div>
  );
}

export { publicProfile };
