import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

// https://www.smashingmagazine.com/2020/03/sortable-tables-react/

function UsersList({ match }) {
  const { path } = match;

  const initialViewer = {
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

  //backend data
  const [users, setUsers] = useState(null);
  const [viewer, setViewer] = useState(initialViewer);

  //sorting
  let sortDirection = 'ascending';
  const [sortedField, setSortedField] = useState(sortDirection);

  useEffect(() => {
    async function fetchData() {
      let userValues = await accountService.userValue;
      accountService.getById(userValues.id).then((data) => {
        setViewer(data);
      });
    }

    fetchData();

    accountService
      .getAll()
      .then((data) => {
        //TODO: take into account homo/hetero before loading data
        const compiledData = data.map((obj) => {
          return {
            id: obj.id,
            first_name: obj.first_name,
            last_name: obj.last_name,
            gender: obj.gender,
            preference: obj.preference,
            location: obj.location,
            likes: obj.likes,
            age: obj.age,
            smoking: obj.smoking,
            drinking: obj.drinking,
            religion: obj.religion,
            pets: obj.pets,
            children: obj.children,
          };
        });
        compiledData.shift(); //remove admin
        setUsers(compiledData);
        setResetUsers(compiledData);
      })
      .catch((error) => {
        alertService.error(error);
      });
  }, []);

  const initialValues = {
    search: '',
  };

  function onSearch(fields, { setStatus, setSubmitting }) {
    setStatus();
    const query = fields.search.toLowerCase();
    const tags = query.split(' ');

    const searchedUsers = [];
    if (query == '' || !query.length) {
      onResetUsers();
    } else {
      resetUsers.map((user) => {
        if (tags[0] == 'age') {
          if (
            Number(user.age) >= Number(tags[1]) &&
            Number(user.age) <= Number(tags[2])
          ) {
            searchedUsers.push(user);
          }
        } else if (tags[0] == 'fame') {
          if (
            Number(user.likes) >= Number(tags[1]) &&
            Number(user.likes) <= Number(tags[2])
          ) {
            searchedUsers.push(user);
          }
        } else if (
          user.first_name.toLowerCase() === query ||
          user.last_name.toLowerCase() === query ||
          user.gender.toLowerCase() === query ||
          user.location.toLowerCase() === query
        ) {
          searchedUsers.push(user);
        } else if (query === 'smoking' && user.smoking) {
          searchedUsers.push(user);
        } else if (query === 'drinking' && user.drinking) {
          searchedUsers.push(user);
        } else if (query === 'religion' && user.religion) {
          searchedUsers.push(user);
        } else if (query === 'pets' && user.pets) {
          searchedUsers.push(user);
        } else if (query === 'children' && user.children) {
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

    if (key == 'age' || key == 'likes') {
      sortedUsers.sort((a, b) => {
        if (sortedField.direction == 'descending') {
          return a[key] - b[key];
        }

        if (sortedField.direction == 'ascending') {
          return b[key] - a[key];
        }
      });
    } else {
      sortedUsers.sort((a, b) => {
        if (a[key] < b[key]) {
          return sortedField.direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortedField.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setUsers(sortedUsers);
    setSortedField({ key, direction });
  }

  const [resetUsers, setResetUsers] = useState(null);
  function onResetUsers() {
    setUsers(resetUsers);
  }

  return (
    <div>
      <div className='form-group'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSearch}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <h1>Search</h1>
              <p>
                {viewer.picture_1
                  ? 'Sexy Singles in Your AREA!'
                  : 'Please fill out your profile for us, including a profile picture.'}
              </p>
              <Field
                name='search'
                type='text'
                placeholder='single word search: female | ranges: age 18 50 | tags: drinking'
                className={
                  'form-control' +
                  (errors.search && touched.search ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name='search'
                component='div'
                className='invalid-feedback'
              />
              <div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='btn btn-primary mr-2'
                >
                  {isSubmitting && (
                    <span className='spinner-border spinner-border-sm mr-1'></span>
                  )}
                  Search
                </button>
                <button
                  type='button'
                  className='btn btn-warning mr-2'
                  onClick={() => onResetUsers()}
                >
                  Reset
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <table className='table table-striped table-condensed table-responsive'>
        <thead>
          <tr>
            <th style={{ width: 'auto' }}></th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('first_name')}>
                Name
              </button>
            </th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('gender')}>
                Gender
              </button>
            </th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('location')}>
                Location
              </button>
            </th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('likes')}>
                Fame
              </button>
            </th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('age')}>
                Age
              </button>
            </th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('smoking')}>
                Smoking
              </button>
            </th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('drinking')}>
                Drinking
              </button>
            </th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('religion')}>
                Religion
              </button>
            </th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('pets')}>
                Pets
              </button>
            </th>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('children')}>
                Children
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {viewer.picture_1 && (
                    <Link
                      to={`${path}/view/${user.id}`}
                      className='btn btn-sm btn-info mr-1'
                    >
                      View
                    </Link>
                  )}
                </td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.gender}</td>
                <td>{user.location}</td>
                <td>{user.likes}</td>
                <td>{user.age}</td>
                <td>{user.smoking ? 'Yes' : 'No'}</td>
                <td>{user.drinking ? 'Yes' : 'No'}</td>
                <td>{user.religion ? 'Yes' : 'No'}</td>
                <td>{user.pets ? 'Yes' : 'No'}</td>
                <td>{user.children ? 'Yes' : 'No'}</td>
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
  );
}

export { UsersList };
