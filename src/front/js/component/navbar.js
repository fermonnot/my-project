import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">DISTRICLICK</span>
				</Link>
				<div className="ml-auto">
					<div className="dropdown">
						<a className ="btn btn-secondary " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="fas fa-bars"></i>
						</a>

						<ul className="dropdown-menu">
							<li><Link to="/login" className="dropdown-item" href="#">Iniciar sesion</Link></li>
							<li><Link to="/register" className="dropdown-item" href="#">Registrarse</Link></li>
							<li><Link to="/demo" className="dropdown-item" href="#">Quienes Somos</Link></li>

							
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
