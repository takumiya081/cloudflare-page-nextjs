import React, {forwardRef} from 'react';

import {Button} from '@mantine/core';
import type {MouseEventHandler} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';

import img from '../../public/image.jpg';

type Value = {
  key: string;
  url: string;
  file: File;
};

type FileInputProps = {
  // https://ant.design/components/upload#uploadfile
  // のbeforeUploadを参考にしています
  beforeUpload?: (file: File) => Promise<Value | false>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, options: {result: Value}) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({onChange, beforeUpload, ...props}, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises -- if に promiseのmethodを入れるとerrorになるぽい。他の書き方も思い浮かばないのでとりあえず無効化
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
      const file = e.target.files?.[0];
      if (!file) {
        return undefined;
      }
      if (beforeUpload) {
        const result = await beforeUpload(file);
        if (result === false) {
          return undefined;
        }
        return onChange?.(e, {result});
      }
      return onChange(e, {
        result: {
          key: file.name,
          url: URL.createObjectURL(file),
          file,
        },
      });
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <input type="file" onChange={handleChange} {...props} ref={ref} />;
  },
);

const IndexPage = (): JSX.Element => {
  const ref = React.useRef<HTMLInputElement>(null);

  const handleClickFileInput: MouseEventHandler<HTMLInputElement> = (e) => {
    e.currentTarget.value = '';
  };

  const {control} = useForm<{test: Array<{key: string; url: string}>}>();
  const {fields, append} = useFieldArray({
    control,
    name: 'test',
  });

  return (
    <>
      <Button
        onClick={() => {
          ref.current?.click();
        }}
      >
        test
      </Button>
      <FileInput
        ref={ref}
        accept="image/png,image/jpg,image/jpeg,image/gif"
        beforeUpload={async (f) => {
          console.log('beforeupload', f);

          const r = await new Promise<any>((resolve) => {
            setTimeout(() => {
              resolve({key: f.name, url: URL.createObjectURL(f), file: f});
            }, 1000);
          });
          return r;
        }}
        type="file"
        onChange={(e, ops) => {
          console.log(e, ops, fields);
          append({key: ops.result.key, url: ops.result.url});
        }}
        onClick={handleClickFileInput}
      />
      <div>
        {fields.map((field) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={field.key} alt={field.key} height="100px" src={field.url} width="100px" />
        ))}
      </div>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={img.src} style={{width: '100%', height: 'auto'}} />
      </div>
    </>
  );
};

export default IndexPage;
