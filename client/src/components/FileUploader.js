import React, { useState } from 'react';
import axios from 'axios';


function FileUploader() {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const myFiles = e.target.myFiles.files;
    const formData = new FormData();
    for (let i = 0; i < myFiles.length; i++) {
      formData.append(myFiles[i].name, myFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:3500/upload', formData);
      setStatus(response.data.status);
      setMessage(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
     
    console.error(error);
    if (error.response) {
      const {message,status} = error.response.data;
      setStatus(status);
      setMessage(message);
    } else if (error.request) {
      setStatus(error.status);
      setMessage(error.statusText);
    } else {
      setStatus(error.status);
      setMessage(error.statusText);
    }
    
}
  };

  return (
    <>
      <div className="container">
      <h1>React File Uploader</h1>
      <form onSubmit={handleFormSubmit} encType="multipart/form-data">
        <input type="file" id="myFiles" accept="image/*" multiple />
        <button type="submit">Submit</button>
      </form>
      <h2>Status: {status}</h2>
      <h3>{message}</h3>
      </div>
    
    </>
  );
}

export default FileUploader;
