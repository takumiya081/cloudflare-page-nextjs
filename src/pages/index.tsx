import React from 'react';

import {Button} from '@mantine/core';
import type {MouseEventHandler} from 'react';

import img from '../../public/image.jpg';

const IndexPage = (): JSX.Element => {
  const ref = React.useRef<HTMLInputElement>(null);

  const handleClickFileInput: MouseEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.value = '';
  };

  return (
    <>
      <Button
        onClick={() => {
          ref.current?.click();
        }}
      >
        test
      </Button>
      <input
        ref={ref}
        accept="image/png,image/jpg,image/jpeg,image/gif"
        type="file"
        onChange={(e) => {
          console.log(e);
        }}
        onClick={handleClickFileInput}
      />
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={img.src} style={{width: '100%', height: 'auto'}} />
      </div>
    </>
  );
};

export default IndexPage;
