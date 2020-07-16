import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

// https://www.smashingmagazine.com/2020/03/sortable-tables-react/

function UsersList({ match }) {
  const { path } = match;
  //backend data
  const [users, setUsers] = useState(null);

  //sorting
  // const [items, requestSort] = useSortableData(null);
  let sortDirection = 'ascending';
  const [sortedField, setSortedField] = useState(sortDirection);

  useEffect(() => {
    accountService
      .getAll()
      .then((data) => {
        //TODO: take into account homo/hetero before loading data
        const compiledData = data.map((obj) => {
          return {
            id: obj.id,
            firstName: obj.firstName,
            lastName: obj.lastName,
            gender: obj.gender,
            location: obj.location,
            fame: obj.fame,
            age: obj.age,
            smoking: obj.smoking,
            drinking: obj.drinking,
            religion: obj.religion,
            pets: obj.pets,
            children: obj.children,
          };
        });
        setUsers(compiledData);
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
    const query = fields.search;
    console.log(users);

    const searchedUsers = [];
    users.map((user) => {
      if (user.gender === query) {
        searchedUsers.push(user);
      }
    }, query);
    console.log(searchedUsers);
    setUsers(searchedUsers);
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

  return (
    <div>
      <p>Sexy Singles in Your AREA!</p>
      <div className='form-group'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSearch}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <h1>Search</h1>
              <Field
                name='search'
                type='text'
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <table className='table table-striped table-condensed table-responsive'>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>
              <button type='button' onClick={() => requestSort('firstName')}>
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
              <button type='button' onClick={() => requestSort('fame')}>
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
            <th style={{ width: 'auto' }}></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.gender}</td>
                <td>{user.location}</td>
                <td>{user.fame}</td>
                <td>{user.age}</td>
                <td>{user.smoking}</td>
                <td>{user.drinking}</td>
                <td>{user.religion}</td>
                <td>{user.pets}</td>
                <td>{user.children}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Link
                    to={`${path}/view/${user.id}`}
                    className='btn btn-sm btn-primary mr-1'
                  >
                    View
                  </Link>
                </td>
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
