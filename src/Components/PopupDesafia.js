import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from "../firebase_setup/firebase"
import newReto1 from "../Multimedia/registerimage.png"
import bg1 from "../Multimedia/background1.png"
import Modal from "react-modal";
import logob from "../Multimedia/LogoBlack.png";   

const customStyles = {
  content: {
    width:"30vw",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

 
    
    
  }
  
};


function PopupDesafia({isOpen, closeModal}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setNumber] = useState("");
  const [dares, setDares] = useState([]);

  const newReto = {
    title: title,
    description: description,
    price: price
  };

  const ref = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, price };
    

    db.collection('dares2').add({
      title: title,
      description: description,
      price: price
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

    setTitle("");
    setDescription("");
    setNumber("");
  }
  useEffect(() => {
    const unsubscribe = db.collection('dares2').onSnapshot(snapshot => {
      const daresData = snapshot.docs.map(doc => doc.data());
      setDares(daresData);
    });
    return () => unsubscribe();
  }, []);



  return (
    
      
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-70"
      >
         <div className="register-container text-center ">
        
        <div className="flex w-full justify-between">
        <div></div>
        <img className="h-20 w-20 bg-transparent border-none outline-none center"  src={logob} alt={"logo"} />
        <button className="w-6 h-6 text-gray-700 hover:text-black" onClick={closeModal}>
        ✕
          </button>
          </div>
        <h1 className="titulo">Nuevo reto</h1>
          
       
          
          <form className="form-group " onSubmit={handleSubmit}>
          <input 
  maxLength={50} 
  className="form-input mt-2 rounded-lg bg-white focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 block w-full appearance-none p-2 mb-4"
  type="text" 
  placeholder="Titulo del reto" 
  value={title} 
  onFocus={(e) => e.target.classList.add("border-yellow-400")}
  onBlur={(e) => e.target.classList.remove("border-yellow-400")}
  onChange={(e) => setTitle(e.target.value)} />
            <input 
              maxLength={200} 
              className="form-input mt-2 rounded-lg bg-white focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 block w-full appearance-none p-2 mb-4"
              type="text" 
              placeholder="Descripción del reto " 
              value={description} 
              onFocus={(e) => e.target.classList.add("border-yellow-400")}
              onBlur={(e) => e.target.classList.remove("border-yellow-400")}
              onChange={(e) => setDescription(e.target.value)} />
            <input 
              maxLength={10} 
              className="form-input mt-2 rounded-lg bg-white focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 block w-full appearance-none p-2 mb-4"
              type="price" 
              placeholder="Precio" 
              value={price} 
              onFocus={(e) => e.target.classList.add("border-yellow-400")}
              onBlur={(e) => e.target.classList.remove("border-yellow-400")}
              onChange={(e) => setNumber(e.target.value)} />
            <button 
              className=" bg-yellow-400 hover:bg-yellow-700 text-Black font-bold py-2 px-4 rounded"
              type="submit">Agregar</button>
          </form>
        
        
      </div>
      </Modal>
     
    
    
  );
}
export default PopupDesafia;


