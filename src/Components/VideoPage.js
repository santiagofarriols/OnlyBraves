import { useState } from 'react'
import VideoPreview from './VideoPreview';
import VideoUploadInput from './Video';
 

function VideoPage() {

  
  
//video
  const [selectedFile, setSelectedFile] = useState(null);

  function handleUpload(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
      });
  }

 
    return (
      <div className="App">
       
       
       
       <div className="main-container" >
       
      <div >
      
    
      
      </div>
      

      <div>
      <VideoUploadInput setSelectedFile={setSelectedFile} />
      {selectedFile && <VideoPreview file={selectedFile} handleUpload={handleUpload} />}
    </div>
    </div>
       
     
     
      
   
      
     
      
      </div>
    );
    }


export default VideoPage;
