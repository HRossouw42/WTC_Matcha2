import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { accountService, alertService } from '@/_services';
import { Carousel } from 'react-responsive-carousel';

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

  accountService.viewed(viewer.id, user.email)

  // Like Button
  //TODO: connect like with backend
  const [isLiked, setIsLiked] = useState(false);
  function onLike() {
    setIsLiked(true);
    accountService.liked(viewer.id, user.email)
  }
  function onDislike() {
    setIsLiked(false);
  }

  // Block Button
  //TODO: connect block with backend
  const [isBlocked, setIsBlocked] = useState(false);
  function onBlock() {
    setIsBlocked(true);
    function confirm (){
      return window.confirm("Are you sure you want to block this user? This action cannot be undone.")
    }
    const blocked = confirm()
    if (blocked){
      accountService.blocked(user.email)
    }
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
      <div>
        <h1> {user.first_name}'s Public Profile</h1>
        <p>
          <strong>Name: </strong> {user.first_name} {user.last_name}
          <br />
          <strong>Age: </strong> {user.age}
          <br />
          <strong>Location: </strong> {user.location}
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
          <br />
        </p>
        <p>
        {user.currently_online ?
        (<span><strong>Online: </strong> {user.currently_online ? 'Yes' : 'No'}</span>) :
        (<span><strong>Last Online: </strong> {user.last_online}</span>)}
        </p>
        <p>
        <strong>Fame: </strong> {user.likes}
        </p>
        <p>
          <strong>Bio: </strong>
          <br />
          {user.bio}
        </p>
        <div>
          <div className='w-50 mx-auto'>
            <Carousel autoPlay>
              <div>
                <img alt='' src={user.picture_1} />
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
          {/* {isBlocked ? (
            <span className='btn-disable' onClick={() => onUnblock()}>
              Unblock ⏺
            </span>
          ) : ( */}
            <span onClick={() => onBlock()}>Block ⏹</span>
          {/* )} */}
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
