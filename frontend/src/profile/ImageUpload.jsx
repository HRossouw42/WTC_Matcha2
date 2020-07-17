//TODO: Link update with services

import React, { useState } from 'react';

import { accountService, alertService } from '@/_services';
import Dropzone from 'react-dropzone';

function ImageUpload({ history }) {
  const user = accountService.userValue;
  const initialValues = {};

  //
  return (
    <div className='btn w-50 mx-auto'>
      <Dropzone
        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
        accept={'image/*'}
      >
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div>
                Drag 'n' drop a photo here, or click to select from your files
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
}

export { ImageUpload };
