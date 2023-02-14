import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from "../firebase_setup/firebase"
import newReto1 from "../Multimedia/registerimage.png"
import bg1 from "../Multimedia/background1.png"
import Modal from "react-modal";


const customStylesd = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
function PopupDesafia(isOpend, closeModald) {
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
    isOpen={!isOpend}
    onRequestClose={closeModald}
    style={customStylesd}
  >
      <div className="p-20 bg-white rounded-lg shadow-md m-8 border-2 border-purple-500 flex" >
        <div className="w-2/3 pr-8">
          <h3 className="text-5xl font-medium text-center text-indigo-500 mb-4">Nuevo Reto</h3>
          <form className="form-group" onSubmit={handleSubmit}>
            <input 
              maxLength={50} 
              className="form-input mt-2 rounded-lg bg-gray-200 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none" 
              type="text" 
              placeholder="Titulo" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} />
            <input 
              maxLength={200} 
              className="form-input mt-2 rounded-lg bg-gray-200 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none" 
              type="text" 
              placeholder="Descripcion" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} />
            <input 
              maxLength={10} 
              className="form-input mt-2 rounded-lg bg-gray-200 focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 block w-full appearance-none" 
              type="price" 
              placeholder="Precio" 
              value={price} 
              onChange={(e) => setNumber(e.target.value)} />
            <button 
              className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-full" 
              type="submit">Agregar</button>
          </form>
        </div>
        <div className="w-1/3">
          <img src={newReto1} alt="Product" className="h-200 w-full object-cover rounded-lg"/>
        </div>
      </div>
      </Modal>
  );
  
  
} 
export default PopupDesafia;