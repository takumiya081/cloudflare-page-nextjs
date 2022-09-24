import React from 'react';

import {Button} from '@mantine/core';

import img from '../../public/image.jpg';

const IndexPage = (): JSX.Element => {
  console.log('test');
  return (
    <>
      this is index<Button>test</Button>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={img.src} style={{width: '100%', height: 'auto'}} />
      </div>
    </>
  );
};

export default IndexPage;
