import { BehaviorSubject } from 'rxjs';
import { history } from '@/_helpers';
import ky from 'ky-universal';
var jwt = require('jsonwebtoken');

const userSubject = new BehaviorSubject(null);

export const accountService = {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  getAll,
  getById,
  updateEmail,
  update,
  delete: _delete,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

async function login(params) {
  const token = await ky
    .post('http://localhost:3000/login', { json: params })
    .then((resp) => resp.text());
  if (token) {
    const decoded = jwt.verify(token, 'secret');
    const user = {
      id: decoded.id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      token: token,
      gender: decoded.gender,
      preference: decoded.preference,
    };
    userSubject.next(user);
    return user;
  }
}

async function logout(email) {
  await ky.post('http://localhost:3000/logout', { body: email });
  userSubject.next(null);
  history.push('/account/login');
}

async function register(params) {
  return await ky.post('http://localhost:3000/register', { json: params });
}

async function forgotPassword(email) {
  return await ky.post('http://localhost:3000/forgot', { body: email });
}

async function resetPassword(token, password) {
  return await ky.post('http://localhost:3000/reset', {
    json: { token, password },
  });
}

async function getAll() {
  return await ky
    .get('http://localhost:3000/users')
    .then((resp) => resp.json());
}

async function updateEmail(email, token) {
  return await ky.post('http://localhost:3000/update-email', { json: { email, token }});
}

async function getById(id) {
  return await ky
    .get(`http://localhost:3000/getById/${id}`)
    .then((resp) => resp.json());
}

async function update(params) {
  params.token = accountService.userValue.token;
  const result = await ky
    .post('http://localhost:3000/profile', { json: params })
    .then((resp) => resp.status);
  if (result == 200) {
    accountService.userValue.preference = params.preference;
    accountService.userValue.username = params.username;
    accountService.userValue.age = params.age;
    accountService.userValue.gender = params.gender;
    accountService.userValue.location = params.location;
    if (params.smoking == 1) {
      accountService.userValue.smoking = 'Yes';
    } else {
      accountService.userValue.smoking = 'No';
    }
    if (params.drinking == 1) {
      accountService.userValue.drinking = 'Yes';
    } else {
      accountService.userValue.drinking = 'No';
    }
    if (params.religion == 1) {
      accountService.userValue.religion = 'Yes';
    } else {
      accountService.userValue.religion = 'No';
    }
    if (params.pets == 1) {
      accountService.userValue.pets = 'Yes';
    } else {
      accountService.userValue.pets = 'No';
    }
    if (params.children == 1) {
      accountService.userValue.children = 'Yes';
    } else {
      accountService.userValue.children = 'No';
    }
    accountService.userValue.bio = params.bio;
  }
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`).then((x) => {
    // auto logout if the logged in user deleted their own record
    if (id === userSubject.value.id) {
      logout();
    }
    return x;
  });
}
