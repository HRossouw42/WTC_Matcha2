import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';

export default (props) => (
  <Carousel autoPlay>
    <div>
      <img alt='' src='http://placecorgi.com/640/480' />
      <p className='legend'>Profile Pic</p>
    </div>
    <div>
      <img alt='' src='http://placecorgi.com/641/480' />
    </div>
    <div>
      <img alt='' src='http://placecorgi.com/642/480' />
    </div>
    <div>
      <img alt='' src='http://placecorgi.com/643/480' />
    </div>
    <div>
      <img alt='' src='http://placecorgi.com/644/480' />
    </div>
  </Carousel>
);
