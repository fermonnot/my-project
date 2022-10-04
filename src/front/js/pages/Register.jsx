import React,   { useState,useContext } from 'react';
import { Context} from "../store/appContext";



const Register = () => {
	let initState = {
		email:'',
		password:'',
		rif:'',
		sicm:'',
	};
	const {actions} = useContext(Context);
	const [userRegister,setUserRegister]= useState(initState);
	
	const handleChange = ({target}) => {
	   setUserRegister ({
		...userRegister,
		[target.name]: target.value,
	   });


	};


	const handleSubmit = async (event) => {
       event.preventDefault();
	   if (userRegister.email.trim() != "" && userRegister.password.trim() != "" && 
	       userRegister.rif.trim() != "" && userRegister.sicm.trim() != "") {
		console.log ("good");
		  let response = await actions.userRegister(userRegister);
	      if (response) {
		    setUserRegister( initState );
		    alert ('se registro con exito');
	      } else {
		    alert ('intente de nuevo');
	    }
	    } else {
		console.log("campos obligatorios");
	    }

	};

  return (

		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form onSubmit = {handleSubmit}>	
						<div className="form-group">
							<label>Correo electrónico</label>
							<input 
							 type="text"
							 name="email" 
							 className="form-control" 
							 onChange={handleChange}
							 value={userRegister.email}
							/>
						</div>

						<div className="form-group">
							<label>Contraseña</label>
							<input  
							 type="text"
							 name="password" 
							 className="form-control" 
							 onChange={handleChange}
							 value={userRegister.password}
							 />
						</div>

						<div className="form-group">
							<label>Rif</label>
							<input  
							 type="text"
							 name="rif" 
							 className="form-control"
							 onChange={handleChange}
							 value={userRegister.rif}
							 />
						</div>

						<div className="form-group">
							<label>SICM</label>
							<input  
							 type="text"
							 name="sicm" 
							 className="form-control" 
							 onChange={handleChange}
							 value={userRegister.sicm}
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