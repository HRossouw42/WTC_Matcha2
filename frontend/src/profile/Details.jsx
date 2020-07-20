import React, { useState, useEffect } from 'react';
import { Link, render } from 'react-router-dom';
// import Carousel from './Carousel';
import { Carousel } from 'react-responsive-carousel';

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
    preference: '',
    picture_1: '',
    picture_2: '',
    picture_3: '',
    picture_4: '',
    picture_5: '',
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
        <strong>Preference: </strong> {user.preference}
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
          {/* <Link to={`${path}/image`}>Update Photos</Link> */}
          <Carousel autoPlay>
            <div>
              <img alt='' src= {user.picture_1}/>
              <p className='legend'>Profile Pic</p>
            </div>
            <div>
              <img alt='' src={user.picture_2} />
              </div>
            <div>
              <img alt='' src={user.picture_3} />
            </div>
            <div>
              <img alt='' src={user.picture_4} />
            </div>
            <div>
              <img alt='' src={user.picture_5} />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { Details };
