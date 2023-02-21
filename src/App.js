import React, { useState } from 'react';
import Navbar from "./Components/Navbar";
import RegisterForm from "./Components/RegisterForm";
import DareVideo from './Components/DareVideo'
import Desafia from'./Components/Desafia';
import RetosDisponibles from './Components/RetosDisponibles';
import VideoPage from './Components/VideoPage';
import HomePage from './Components/HomePage';

function App() {
	const [currentForm, setCurrentForm] = useState("home");

	const changeForm = (e) => {
		setCurrentForm(e)
	  }

	return (
	<React.Fragment>
		<Navbar   toggleLogin={() => setCurrentForm("login")} toggleRegister={() => setCurrentForm("register")} toggleHome={() => setCurrentForm("home")} toggleChallenge={() => setCurrentForm("desafia")} toggleDare={() => setCurrentForm("atrevete")}  />
		<main >
		{currentForm === "reto" && <DareVideo />}
		{currentForm === "register" && <RegisterForm />}
		{/* {currentForm === "login" && <Popuplogin toggleRegister={() => setCurrentForm("register")} />} */}
		{currentForm === "home" && <HomePage toggleHome={() => setCurrentForm("reto")}/>}
		{currentForm === "desafia" && <Desafia/>}
		{currentForm === "video" && <VideoPage />}
		{currentForm === "atrevete" && <RetosDisponibles submitVideo={changeForm}/>}
		
		</main>
	</React.Fragment>
	);
	}
	
export default App;