import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	let handleSearch = (e) => {
		actions.filterProducts(e.target.value)
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">


					<span className="navbar-brand mb-0 h1">DISTRICLICK</span>

				</Link>
				<div>
					<input onChange={(e) => handleSearch(e)} />
				</div>
				<div className="ml-auto">
					<div className="dropdown">
						<a className="btn btn-secondary " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="fas fa-bars"></i>
						</a>

						<ul className="dropdown-menu dropdown-menu-end">
							<li><Link to="/admin" className="dropdown-item border-bottom" href="#">Admin</Link></li>
							<li><Link to="/register" className="dropdown-item border-bottom" href="#">Registrarse</Link></li>
							<li><Link to="/about" className="dropdown-item border-bottom" href="#">Quienes Somos</Link></li>
							<li><Link to="/login" className="dropdown-item border-bottom" href="#">Iniciar sesion</Link></li>
							<li><Link to="/order" className="dropdown-item border-bottom" href="#">Ordenar</Link></li>		
							
						</ul>
					</div>
				</div>
				<div className="ml-auto">
					<button
						onClick={() => {
							actions.logout();
						}}
					>
						Salir
					</button>
				</div>
			</div>
		</nav>
	);
};
