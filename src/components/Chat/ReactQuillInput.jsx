import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReactQuillInput = (props) => {
  return <ReactQuill className='flex-1' theme="snow" value={props.value} onChange={props.onChange} />;
};

export default ReactQuillInput;
