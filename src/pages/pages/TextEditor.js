import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const TextEditor = ({ description, onDescriptionChange }) => {
  return (
    <div style={{ width: '100%' }}>
      <ReactQuill
        theme="snow"
        value={description}
        onChange={onDescriptionChange}
        style={{ height: '350px', paddingBottom: '30px' }}
      />
    </div>
  );
};

export default TextEditor;
