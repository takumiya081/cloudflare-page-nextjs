import React from 'react';
import Image from 'next/future/image';

import {Button} from '@mantine/core';

import img from '../../public/image.jpg';

const IndexPage = (): JSX.Element => {
  console.log('test');
  return (
    <>
      this is index<Button>test</Button>
      <div>
        <Image alt="" src={img} style={{width: '100%', height: 'auto'}} />
      </div>
    </>
  );
};

export default IndexPage;
