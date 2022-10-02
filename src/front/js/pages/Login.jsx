import React,   { useState,useContext } from 'react';
import { Context } from '../store/appContext';


const Login = () => {
	let initState = {
		email:'',
		password: '',
	};
	const {actions} = useContext(Context);
	const [userLogin,setUserLogin]= useState(initState);

	const handleChange = ({target}) => {
		setUserLogin ({
		 ...userLogin,
		 [target.name]:target.value,
		});

	 };

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (userLogin.email.trim() != "" && userLogin.password.trim() != "") {
		   let response = await actions.Login(userLogin);
		 } else {
		 console.log("campos obligatorios");
		 }
 
	};

 


  return (
    <div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form onSubmit={handleSubmit}>
						<div className="form- group">
							<label>Email</label>
							<input type="text"
							 name="email" 
							 className="form-control"
							 onChange={handleChange}
							 value={userLogin.email}
							 />
						</div>

						<div className="form- group">
							<label>Password</label>
							<input type="text" 
							name="password" 
							className="form-control"
							onChange={handleChange}
							value={userLogin.password}
							/>
						</div>

						<button className="btn btn-secundary w-100 my-3">
							Iniciar sesion
						</button>

					</form>
				</div>
			</div>
		</div>
  )
}

export default Login