import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Notifications({ match }) {
  const initialValues = {
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
    like_history: '',
    view_history: '',
  };

  const initialLikeHistory = {};

  const userStart = accountService.userValue;
  const [user, setUser] = useState(userStart);
  const [likeHistory, setLikeHistory] = useState(initialLikeHistory);

  useEffect(() => {
    async function update(data) {
      alertService.info(`Here we go ${like_history}!`, { autoClose: true });
      setTimeout(update, 5000);
    }

    async function fetchData() {
      let userValues = await accountService.userValue;
      accountService.getById(userValues.id).then((data) => {
        setUser(data);
        update(data.like_history);
      });
    }

    fetchData();
  }, []);

  return <div></div>;
}

export { notifications };
