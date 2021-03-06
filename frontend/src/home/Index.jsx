import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Home({ match }) {
  const { path } = '';

  //logged in user data
  const userStart = accountService.userValue;
  const [user, setUser] = useState(userStart);

  //backend data
  const [users, setUsers] = useState(null);
  const [likeHistory, setLikeHistory] = useState('');

  //sorting
  // const [items, requestSort] = useSortableData(null);
  let sortDirection = 'ascending';
  const [sortedField, setSortedField] = useState(sortDirection);

  useEffect(() => {
    let oldLikes = '';
    let oldViews = '';

    let isMounted = true;

    async function fetchData() {
      let userValues = await accountService.userValue;
      accountService.getById(userValues.id).then((data) => {
        if (isMounted) {
          setUser(data);
          getSuggestions(data);
        }
        updateNotifications(data.like_history, data.view_history);
        setTimeout(fetchData, 5000);
      });
    }

    async function updateNotifications(newLikes, newViews) {
      if (oldLikes != newLikes) {
        oldLikes = newLikes;
        if (oldLikes != null) {
          let likesArray = oldLikes.split(',');
          let index = likesArray.slice(-1);
          const userName = accountService.getById(index).then((data) => {
            alertService.info(`You got a like from user ${data.first_name}!`, {
              autoClose: false,
            });
          });
        }
      }
      if (oldViews != newViews) {
        oldViews = newViews;
        if (oldViews != null) {
          let viewsArray = oldViews.split(',');
          let index = viewsArray.slice(-1);
          const userName = accountService.getById(index).then((data) => {
            alertService.info(
              `You got checked out from user ${data.first_name}!`,
              {
                autoClose: false,
              }
            );
          });
        }
      }
    }

    function getSuggestions(userValue) {
      accountService
        .getAll()
        .then((data) => {
          const compiledData = [];
          let count = 0;

          data.map((obj) => {
            if (
              count < 10 &&
              obj.likes >= 30 &&
              obj.location == userValue.location &&
              obj.id != userValue.id &&
              (obj.gender == userValue.preference ||
                obj.gender == 'nonbinary') &&
              (obj.preference == userValue.gender ||
                userValue.gender == 'nonbinary')
            ) {
              let newObj = {
                id: obj.id,
                first_name: obj.first_name,
                last_name: obj.last_name,
                gender: obj.gender,
                location: obj.location,
                likes: obj.likes,
                age: obj.age,
                smoking: obj.smoking,
                drinking: obj.drinking,
                religion: obj.religion,
                pets: obj.pets,
                children: obj.children,
              };
              compiledData.push(newObj);
              count++;
            }
          });

          setUsers(compiledData);
          setResetUsers(compiledData);
        })
        .catch((error) => {
          alertService.error(error);
        });
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const initialValues = {
    search: '',
  };

  function onSearch(fields, { setStatus, setSubmitting }) {
    setStatus();
    const query = fields.search;

    const searchedUsers = [];
    if (query == '' || !query.length) {
      onResetUsers();
    } else {
      resetUsers.map((user) => {
        if (
          user.fame === query ||
          user.last_name === query ||
          user.gender === query ||
          user.location === query ||
          user.age === query
        ) {
          searchedUsers.push(user);
        } else if (query === 'smoking' && user.smoking === 'Yes') {
          searchedUsers.push(user);
        } else if (query === 'drinking' && user.drinking === 'Yes') {
          searchedUsers.push(user);
        } else if (query === 'religion' && user.religion === 'Yes') {
          searchedUsers.push(user);
        } else if (query === 'pets' && user.pets === 'Yes') {
          searchedUsers.push(user);
        } else if (query === 'children' && user.children === 'Yes') {
          searchedUsers.push(user);
        }
      }, query);
      setUsers(searchedUsers);
    }
    setSubmitting(false);
  }

  const validationSchema = Yup.object().shape({
    search: Yup.string().min(2, 'Please enter a valid query'),
  });

  function requestSort(key) {
    let sortedUsers = users;
    let direction = 'ascending';

    if (sortedField.key === key && sortedField.direction === 'ascending') {
      direction = 'descending';
    }

    sortedUsers.sort((a, b) => {
      if (a[key] < b[key]) {
        return sortedField.direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortedField.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
    setSortedField({ key, direction });
  }

  const [resetUsers, setResetUsers] = useState(null);
  function onResetUsers() {
    setUsers(resetUsers);
  }

  return (
    <div className='p-4'>
      <div className='container'>
        <h1>Hi {user.first_name}!</h1>
        <p>
          {user.gender
            ? 'We think you might like...'
            : 'Please fill out your profile for us to make a matcha'}
        </p>
      </div>
      <div>
        <table className='table table-striped table-condensed table-responsive'>
          <thead>
            <tr>
              <th style={{ width: 'auto' }}></th>
              <th style={{ width: '30%' }}>
                <strong type='button'>Name</strong>
              </th>
              <th style={{ width: '25%' }}>
                <strong type='button'>Gender</strong>
              </th>
              <th style={{ width: '25%' }}>
                <strong type='button'>Fame</strong>
              </th>
              <th style={{ width: '25%' }}>
                <strong type='button'>Age</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              user.picture_1 &&
              users.map((user) => (
                <tr key={user.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Link
                      to={`search/view/${user.id}`}
                      className='btn btn-sm btn-info mr-1'
                    >
                      View
                    </Link>
                  </td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.gender}</td>
                  <td>{user.likes}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            {!users && (
              <tr>
                <td colSpan='4' className='text-center'>
                  <span className='spinner-border spinner-border-lg align-center'></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { Home };
