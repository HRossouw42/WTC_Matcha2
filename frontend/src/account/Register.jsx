import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Register({ history }) {
  const initialValues = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    location: 'other'
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf(
      [true],
      'Accept Terms & Conditions is required'
    ),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService
      .register(fields)
      .then(() => {
        alertService.success(
          'Registration successful, please check your email for verification instructions',
          { keepAfterRouteChange: true }
        );
        history.push('login');
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h3 className='card-header'>Register</h3>
          <div className='card-body'>
          <div className='form-group'>
                <label>Username</label>
                <Field
                  name='username'
                  type='text'
                  className={
                    'form-control' +
                    (errors.username && touched.username? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='username'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            <div className='form-row'>
              <div className='form-group col-5'>
                <label>First Name</label>
                <Field
                  name='first_name'
                  type='text'
                  className={
                    'form-control' +
                    (errors.first_name && touched.first_name ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='first_name'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group col-5'>
                <label>Last Name</label>
                <Field
                  name='last_name'
                  type='text'
                  className={
                    'form-control' +
                    (errors.last_name && touched.last_name ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='last_name'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>
            <div className='form-group'>
              <label>Email</label>
              <Field
                name='email'
                type='text'
                className={
                  'form-control' +
                  (errors.email && touched.email ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name='email'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-row'>
              <div className='form-group col'>
                <label>Password</label>
                <Field
                  name='password'
                  type='password'
                  className={
                    'form-control' +
                    (errors.password && touched.password ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group col'>
                <label>Confirm Password</label>
                <Field
                  name='confirmPassword'
                  type='password'
                  className={
                    'form-control' +
                    (errors.confirmPassword && touched.confirmPassword
                      ? ' is-invalid'
                      : '')
                  }
                />
                <ErrorMessage
                  name='confirmPassword'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>
            <div className='form-group form-check'>
              <Field
                type='checkbox'
                name='acceptTerms'
                id='acceptTerms'
                className={
                  'form-check-input ' +
                  (errors.acceptTerms && touched.acceptTerms
                    ? ' is-invalid'
                    : '')
                }
              />
              <label htmlFor='acceptTerms' className='form-check-label'>
                Accept Terms & Conditions
              </label>
              <ErrorMessage
                name='acceptTerms'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-primary'
              >
                {isSubmitting && (
                  <span className='spinner-border spinner-border-sm mr-1'></span>
                )}
                Register
              </button>
              <Link to='login' className='btn btn-link'>
                Cancel
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Register };
