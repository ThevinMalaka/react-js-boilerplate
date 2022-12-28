import React,  {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Button from '@mui/material/Button';
import axios from 'axios';

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#f5f5f5',
  // height: '100vh',
  borderStyle: 'dotted',
  boarderColor: '#ccc',
  borderRadius: 15,
  margin: 50
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
  backgroundColor: '#f5f5f5'
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};



function App() {

  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [file, setFile] = useState(null);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   fetch(
  //     `http://farga-msccl-1f89unhhbsp2l-1708278478.us-east-1.elb.amazonaws.com/generate/${number}`
  //   )
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       setResult(data.output)
  //       setNumber("");
  //     })
  //     .catch(function (error) {
  //       console.log("Error in fetching weather data");
  //     });
  // };

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  const  handleSubmit  = async e  =>  {
    const onUploadProgress = (event) => {
      const percentage = Math.round((100 * event.loaded) / event.total);
      console.log(percentage);
    };
    
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', 1);
    console.log("formData", formData);

    axios.post('http://localhost:4000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };



  const [files, setFiles] = useState([]);

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 10,
    accept: {
      'image/*': [],
      'video/*': [],
      'audio/*': [],
      'application/pdf': [],
      'application/msword': [],
    },
    multiple: true,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      console.log("file", acceptedFiles);
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => {
      console.log("file", file);
      URL.revokeObjectURL(file.preview)
    });
  }, []);

  return (
    <div>
    <section style={container}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files.</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Button onClick={()=>{
        handleChange();
      }} style={{width: 500, borderRadius: 15}} variant="contained">Submit</Button>
    </div>

    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
    </div>
  );
}



export default App;