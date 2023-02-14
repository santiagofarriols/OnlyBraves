import React, { useState } from 'react';

function VideoUploadInput({ setSelectedFile }) {
  return (
    <input type="file" onChange={e => setSelectedFile(e.target.files[0])} />
  );
}

export default VideoUploadInput;
