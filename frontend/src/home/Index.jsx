import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Home({ match }) {
  const { path } = '';
  const user = accountService.userValue;

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
        //TODO: take into account user location
        const compiledData = [];
        // console.log(data);
        data.map((obj) => {
          if (
            obj.likes <= 10 ||
            obj.location === 'Western Cape' ||
            obj.gender === 'female'
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
          }
        });
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
        <p>We think you might like...</p>
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
