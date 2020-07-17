import { BehaviorSubject } from 'rxjs';
// import config from 'config';
import { fetchWrapper, history } from '@/_helpers';
import ky from 'ky-universal'
var jwt = require('jsonwebtoken')

const userSubject = new BehaviorSubject(null);
// const baseUrl = `${config.apiUrl}`;

export const accountService = {
    login,
    logout,
    // refreshToken,
    register,
    // verifyEmail,
    forgotPassword,
    // validateResetToken,
    resetPassword,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
}

async function login(params) {
    const token = await ky.post('http://localhost:3000/login', { json: params }).then(resp => resp.text())
    if (token){
        const decoded = jwt.verify(token, 'secret')
        const user = {
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            token: token,
        }
        userSubject.next(user)
        console.log(user)
        return user
    }
}

function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    fetchWrapper.post(`${baseUrl}/revoke-token`, {});
    stopRefreshTokenTimer();
    userSubject.next(null);
    history.push('/account/login');
}

// function refreshToken() {
//     return fetchWrapper.post(`/refresh-token`, {})
//         .then(user => {
//             // publish user to subscribers and start timer to refresh token
//             userSubject.next(user);
//             startRefreshTokenTimer();
//             return user;
//         });
// }

async function register(params) {
    return await ky.post('http://localhost:3000/register', { json: params })
}

// function verifyEmail(token) {
//     return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
// }

async function forgotPassword ( email ) {
    return await ky.post('http://localhost:3000/forgot', { body: email } )
}

// function validateResetToken(token) {
//     return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
// }

async function resetPassword( token, password ) {
    // return fetchWrapper.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
    // /forgot
    // params = {
    //     token: token,
    //     password: password
    // }{json: {foo: true}}
    return await ky.post('http://localhost:3000/reset', {json: { token, password }})
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

async function update(params) {
    await ky.post('http://localhost:3000/profile', { json: params }).then(resp => resp.json())
    // return fetchWrapper.put(`${baseUrl}/${id}`, params)
    //     .then(user => {
    //         // update stored user if the logged in user updated their own record
    //         if (user.id === userSubject.value.id) {
    //             // publish updated user to subscribers
    //             user = { ...userSubject.value, ...user };
    //             userSubject.next(user);
    //         }
    //         return user;
    //     });
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then(x => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}

// helper functions

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
