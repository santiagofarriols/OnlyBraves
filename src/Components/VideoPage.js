import { useState } from 'react';
import VideoPreview from './VideoPreview';
import VideoUploadInput from './Video';
import Modal from 'react-modal';
import logob from '../Multimedia/LogoBlack.png';

const customStyles = {
  content: {
    width: '30vw',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function VideoPage({ isOpen, closeModal, dare }) {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleUpload(file) {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-70"
    >
      <div className="register-container text-center">
        <div className="flex w-full justify-between ">
          <div></div>
          <img
            className="h-20 w-20 bg-transparent border-none outline-none center"
            src={logob}
            alt={'logo'}
          />
          <button
            className="w-6 h-6 text-gray-700 hover:text-black"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>
        <h1 className="titulo">Sube tu video </h1>

        <div className="main-container">
          <div></div>

          <div>
            <VideoUploadInput setSelectedFile={setSelectedFile} />
            {selectedFile && (
              <VideoPreview file={selectedFile} handleUpload={handleUpload} dare={dare} />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default VideoPage;