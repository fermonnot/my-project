import React,   { useState,useContext } from 'react';
import { Context} from "../store/appContext";



const Register = () => {
	let initState = {
		email:'',
		pasword:'',
		rif:'',
		sicm:'',
	}
	const {actions} = useContext(Context)
	const [userRegister,setUserRegister]= useState(initState);
	const handleChange = ({target}) => {
	   setUserRegister ({
		...userRegister,
		[target.name]:target.value,
	   });


	};
	const handleSubmit = async (event) => {
       event.preventDefault();
	   if (userRegister.email.trim() != "" && userRegister.password.trim() != "" && 
	   userRegister.Rif.trim() != "" && userRegister.Sicm.trim() != ""){
		console.log ("good");
		let response = await actions.userRegister(userRegister);
	   if (response){
		  alert ('se registro con exito');
	   }else{
		   alert ('intente de nuevo');
	   }
	   } else {
		console.log ("campos obligatorios");
	   }

	};
  return (

		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form onSubmit = {handleSubmit}>
						<div className="form- group">
							<label>Email</label>
							<input type="text"
							 name="email" 
							 className="form-control" 
							 onChange={handleChange}
							/>
						</div>

						<div className="form- group">
							<label>Password</label>
							<input type="text"
							 name="password" 
							 className="form-control" 
							 onChange={handleChange}
							 />
						</div>

						<div className="form- group">
							<label>Rif</label>
							<input type="text"
							 name="Rif" 
							 className="form-control"
							 onChange={handleChange}
							 />
						</div>

						<div className="form- group">
							<label>SICM</label>
							<input type="text"
							 name="Sicm" 
							 className="form-control" 
							 onChange={handleChange}
							 />
						</div>

						<button className="btn btn-secundary w-100 my-3">
							Registrarse
						</button>

					</form>
				</div>
			</div>
		</div>
  )
}

export default Register;