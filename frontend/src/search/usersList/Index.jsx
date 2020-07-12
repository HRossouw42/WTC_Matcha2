import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';

function UsersList({ match }) {
  const { path } = match;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    accountService.getAll().then((x) => setUsers(x));
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <p>Sexy Singles in Your AREA!</p>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>Name</th>
            <th style={{ width: '20%' }}>Location</th>
            <th style={{ width: '10%' }}>Fame</th>
            <th style={{ width: '10%' }}>Age</th>
            <th style={{ width: '40%' }}>Tags</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.location}</td>
                <td>{user.fame}</td>
                <td>{user.age}</td>
                <td>{user.tags}</td>
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
