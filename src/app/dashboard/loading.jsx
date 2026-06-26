import React from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='mx-auto my-8'>
          <HashLoader color='#1E3A8A'/>
        </div>
    );
};

export default Loading;