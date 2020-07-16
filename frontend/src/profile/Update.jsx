//TODO: Link update with services

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Update({ history }) {
  const user = accountService.userValue;
  const initialValues = {
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
    email: user.email,
    gender: user.gender,
    orientation: user.orientation,
    location: user.location,
    smoking: user.smoking,
    drinking: user.drinking,
    religion: user.religion,
    pets: user.pets,
    children: user.children,
    bio: user.bio,
    password: '',
    confirmPassword: '',
  };

  //TODO: bio text input validation
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    age: Yup.number().required('Age is required to be a number'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    orientation: Yup.string().required('Orientation is required'),
    location: Yup.string().required('Location is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .when('password', (password, schema) => {
        if (password) return schema.required('Confirm Password is required');
      })
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    accountService
      .update(fields)
      .then(() => {
        alertService.success('Update successful', {
          keepAfterRouteChange: true,
        });
        history.push('.');
      })
      .catch((error) => {
        setSubmitting(false);
        alertService.error(error);
      });
  }

  const [isDeleting, setIsDeleting] = useState(false);
  function onDelete() {
    if (confirm('Are you sure?')) {
      setIsDeleting(true);
      accountService
        .delete(user.id)
        .then(() => alertService.success('Account deleted successfully'));
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h1>Update Profile</h1>
          {/* Name & Surname*/}
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
            <div className='form-group col-1'>
              <label>Age</label>
              <Field
                name='age'
                type='number'
                className={
                  'form-control' +
                  (errors.age && touched.age ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name='age'
                component='div'
                className='invalid-feedback'
              />
            </div>
          </div>
          {/* Email */}
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
          {/* gender */}
          <div className='form-group'>
              <label>Gender</label>
              <Field
                name='gender'
                as='select'
                className={
                  'form-control' +
                  (errors.gender && touched.gender ? ' is-invalid' : '')
                }
              >
                <option value=''></option>
                <option value='male'>male</option>
                <option value='female'>female</option>
                <option value='nonbinary'>nonbinary</option>
              </Field>
              <ErrorMessage
                name='gender'
                component='div'
                className='invalid-feedback'
              />
          </div>
          {/* orientation */}
          <div className='form-group'>
              <label>Orientation</label>
              <Field
                name='orientation'
                as='select'
                className={
                  'form-control' +
                  (errors.orientation && touched.orientation ? ' is-invalid' : '')
                }
              >
                <option value=''></option>
                <option value='heterosexual'>heterosexual</option>
                <option value='homosexual'>homosexual</option>
                <option value='any'>any</option>
              </Field>
              <ErrorMessage
                name='orientation'
                component='div'
                className='invalid-feedback'
              />
          </div>
          {/* Passwords */}
          <h3 className='pt-3'>Change Password</h3>
          <p>Leave blank to keep the same password</p>
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
            <div className='form-group col-5'>
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
          {/* Tags */}
          <h1>Interests</h1>
          <div className='form-row'>
            <div className='form-group col-2'>
              <label>Smoking?</label>
              <Field
                name='smoking'
                as='select'
                className={
                  'form-control' +
                  (errors.smoking && touched.smoking ? ' is-invalid' : '')
                }
              >
                <option value=''></option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </Field>
              <ErrorMessage
                name='smoking'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group col-2'>
              <label>Drinking?</label>
              <Field
                name='drinking'
                as='select'
                className={
                  'form-control' +
                  (errors.drinking && touched.drinking ? ' is-invalid' : '')
                }
              >
                <option value=''></option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </Field>
              <ErrorMessage
                name='drinking'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group col-2'>
              <label>Religious?</label>
              <Field
                name='religion'
                as='select'
                className={
                  'form-control' +
                  (errors.religion && touched.religion ? ' is-invalid' : '')
                }
              >
                <option value=''></option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </Field>
              <ErrorMessage
                name='religion'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group col-2'>
              <label>Pets?</label>
              <Field
                name='pets'
                as='select'
                className={
                  'form-control' +
                  (errors.pets && touched.pets ? ' is-invalid' : '')
                }
              >
                <option value=''></option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </Field>
              <ErrorMessage
                name='pets'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group col-2'>
              <label>Children?</label>
              <Field
                name='children'
                as='select'
                className={
                  'form-control' +
                  (errors.children && touched.children ? ' is-invalid' : '')
                }
              >
                <option value=''></option>
                <option value='Yes'>Yes</option>
                <option value='No'>No</option>
              </Field>
              <ErrorMessage
                name='children'
                component='div'
                className='invalid-feedback'
              />
            </div>
          </div>
          <div className='form-group'>
            <label>Write a short bio about yourself</label>
            <Field
              name='bio'
              type='text'
              className={
                'form-control' +
                (errors.bio && touched.bio ? ' is-invalid' : '')
              }
            />
            <ErrorMessage
              name='bio'
              component='div'
              className='invalid-feedback'
            />
          </div>
          {/* Submit Buttons */}
          <div className='form-group'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary mr-2'
            >
              {isSubmitting && (
                <span className='spinner-border spinner-border-sm mr-1'></span>
              )}
              Update
            </button>
            <button
              type='button'
              onClick={() => onDelete()}
              className='btn btn-danger'
              style={{ width: '75px' }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className='spinner-border spinner-border-sm'></span>
              ) : (
                <span>Delete</span>
              )}
            </button>
            <Link to='.' className='btn btn-link'>
              Cancel
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export { Update };
