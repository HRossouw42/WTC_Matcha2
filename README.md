# Matcha 
Built by [jadinek](https://github.com/jadinek) & [myself](https://github.com/HRossouw42) for our [WeThinkCode_](https://www.wethinkcode.co.za/) web module.

## WeThinkCode_ web project
It's Matcha! A matchmaking dating website for a WeThinkCode_ webmodule project and the capstone to the web module.  
Built in a few weeks. It's not pretty, but it works!

# Features
- User login, register & forget password functionality. Login requires email verification.
- Homepage with assigned 'matches' based on weighted criteria of the user's preferences & location. Location determined via google api request with IP used as a fallback.
- User only gets full access to the site after completing their profile.
- Notifications if another user likes you or visits your page.
- Update page to update user credentials & their preferences regarding matches and upload profile pictures.
- Email reset & password forgot functionality which sends you an email.
- Search functionality with sorting, ranges and single keyword search.
- User likes, and a *very* aggressive block feature.

# Tech stack used
## Backend
Node.JS and Typescript

- Knex and SQL calls used to communicate between the database and the Node.js backend. Koa as middleware for the frontend. Nodemailer for emails.
- Faker used for seeding database with 500 dummy users (including profile pictures).
- Storage must be in a SQL database. We used SQLITE3. Passwords hashed using bcrypt.
- Backend provides web tokens for user identification.

# TODO:
We didn't get to implement chat or proper user reporting. But the basis for them is there.

## Frontend
React, Bootstrap & modern Javascript

# To run
## Backend
1. `npm run seed`
1. `npm run build`
2. `npm start`

## Frontend
1. `npm start`  

--- 

# Examples

Register Page
![Register Page](https://github.com/HRossouw42/WTC_Matcha2/blob/master/image_register.jpg)

Example Profile
![Example Profile](https://github.com/HRossouw42/WTC_Matcha2/blob/master/image_publicProfile.jpg)

Matches based on your profile and IP/GPS location
![Matches](https://github.com/HRossouw42/WTC_Matcha2/blob/master/image_matches.jpg)

Extensive search capabilities 
![Search](https://github.com/HRossouw42/WTC_Matcha2/blob/master/image_search.jpg)


*To my fellow WTCoders:
Warning contains 🐞🐞🐞. Copy paste at your own peril. Or just learn React & Node.js, they're kinda great!*
