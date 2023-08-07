import React, { useState, useContext } from 'react';
import Modal from "react-modal";
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../Components/AuthContext';

Modal.setAppElement('#root');

const CARD_ELEMENT_OPTIONS = {};
  

function PopupBuyCoins({ isOpen, closeModal }) {
  const [coins, setCoins] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { uid } = currentUser || {};
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
        const response = await axios.post('https://europe-west1-onlybraves-33e80.cloudfunctions.net/createPaymentIntent', { 
        amount: coins * 100,
        currency: 'eur'
      });

      const clientSecret = response.data.client_secret;  // Acceder a la propiedad client_secret del objeto response.data

      const payload = await stripe.confirmCardPayment(clientSecret, {  // Pasar el clientSecret como un string
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
      } else {
        // Aquí puedes hacer cualquier lógica post-pago (actualizar DB, mostrar mensaje, etc.)
      }
    } catch (error) {
      setError(error.message);
    }
    setProcessing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className="register-container text-center ">
        <form className="form-group " onSubmit={handleSubmit}>
          <input
            className="form-input mt-2 rounded-lg bg-white focus:outline-none focus:shadow-outline border-2 border-gray-400 py-2 px-4 block w-full appearance-none p-2 mb-4"
            type="number"
            placeholder="Cantidad de Brave Coins"
            value={coins}
            onFocus={(e) => e.target.classList.add("border-yellow-400")}
            onBlur={(e) => e.target.classList.remove("border-yellow-400")}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue.length <= 4) {
                setCoins(inputValue);
              }
            }}
          />

<div style={{ border: '1px solid black', padding: '10px' }}>
  <CardElement options={CARD_ELEMENT_OPTIONS} />
</div>

          <button
            className={`mt-4 font-medium py-2 px-4 rounded-full ${
              currentUser && !processing ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-gray-500 text-white cursor-not-allowed"
            }`}
            type="submit"
            disabled={!stripe || !elements || !currentUser || processing}
          >
            {processing ? "Processing..." : "Comprar"}
          </button>
          
        </form>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default PopupBuyCoins;
