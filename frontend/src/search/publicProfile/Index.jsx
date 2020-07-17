import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { accountService, alertService } from '@/_services';

function publicProfile({ history, match }) {
  const { id } = match.params;

  const viewer = accountService.userValue;

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    likes: '',
  };

  const [user, setUser] = useState(initialValues);

  useEffect(() => {
    // get user and set form fields
    accountService.getById(id).then((data) => {
      setUser(data);
    });
  }, []);

  // Like Button
  //TODO: connect like with backend
  const [isLiked, setIsLiked] = useState(false);
  function onLike() {
    setIsLiked(true);
    //accountservice.Like
  }
  function onDislike() {
    setIsLiked(false);
  }

  // Block Button
  //TODO: connect block with backend
  const [isBlocked, setIsBlocked] = useState(false);
  function onBlock() {
    setIsBlocked(true);
    //accountservice.block
  }
  function onUnblock() {
    setIsBlocked(false);
  }

  // Report Button
  //TODO: connect report to backend
  const [isReporting, setIsReporting] = useState(false);
  function onReport() {
    setIsReporting(true);
    //accountservice.report
    alertService.error(
      'Thank you for your report. Our admins will look into the matter and respond accordingly.'
    );
  }

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
        <strong>Fame:</strong>
        {user.likes}
        <br />
        <strong>Bio: </strong>
        {user.bio}
        <br />
      </p>
      <div>
        <button
          type='button'
          className='btn btn-primary'
          style={{ width: '75 px' }}
        >
          {isLiked ? (
            <span className='btn-disable' onClick={() => onDislike()}>
              Unlike 💔
            </span>
          ) : (
            <span onClick={() => onLike()}>Like ❤️</span>
          )}
        </button>
      </div>
      <div>
        <button
          type='button'
          className='btn btn-secondary'
          style={{ width: '75 px' }}
        >
          {isBlocked ? (
            <span className='btn-disable' onClick={() => onUnblock()}>
              Unblock ⏺
            </span>
          ) : (
            <span onClick={() => onBlock()}>Block ⏹</span>
          )}
        </button>
      </div>
      <div>
        <button
          type='button'
          onClick={() => onReport()}
          className='btn btn-danger'
          style={{ width: '75px' }}
          disabled={isReporting}
        >
          {isReporting ? <span className=''>😡</span> : <span>Report</span>}
        </button>
      </div>
    </div>
  );
}

export { publicProfile };
