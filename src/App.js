import React, { useState } from 'react';
import Navbar from "./Components/Navbar";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import HomePage from './Components/HomePage'
import VideoPlayer from './Components/VideoPlayer';
import Popuplogin from './Components/Popuplogin';

import Desafia from'./Components/Desafia';
import RetosDisponibles from './Components/RetosDisponibles';
import VideoPage from './Components/VideoPage';

function App() {
	const [currentForm, setCurrentForm] = useState("home");

	const changeForm = (e) => {
		setCurrentForm(e)
	  }

	return (
	<React.Fragment>
		<Navbar   toggleLogin={() => setCurrentForm("login")} toggleRegister={() => setCurrentForm("register")} toggleHome={() => setCurrentForm("home")} toggleChallenge={() => setCurrentForm("desafia")} toggleDare={() => setCurrentForm("atrevete")}  />
		<main >
		{currentForm === "reto" && <HomePage />}
		{currentForm === "register" && <RegisterForm />}
		{/* {currentForm === "login" && <Popuplogin toggleRegister={() => setCurrentForm("register")} />} */}
		{currentForm === "home" && <VideoPlayer toggleHome={() => setCurrentForm("reto")}/>}
		{currentForm === "desafia" && <Desafia/>}
		{currentForm === "atrevete" && <RetosDisponibles submitVideo={changeForm}/>}
		{currentForm === "video" && <VideoPage />}
		</main>
	</React.Fragment>
	);
	}
	
export default App;