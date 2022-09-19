import React from 'react'

const Login = () => {
  return (
    <div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form>
						<div className="form- group">
							<label>Email</label>
							<input type="text" name="email" className="form-control"/>
						</div>

						<div className="form- group">
							<label>Password</label>
							<input type="text" name="email" className="form-control"/>
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