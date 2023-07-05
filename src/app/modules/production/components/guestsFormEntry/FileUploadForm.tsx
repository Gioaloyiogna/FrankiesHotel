import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../urls';

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e:any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append('files', selectedFile); // Use 'files' as the form field name
  
      try {
        const response = await axios.post(BASE_URL + "/files", formData);
        console.log(response.data); // Handle the API response
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;
