import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				<h1>ACA SE INICA SESION </h1>
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Vuelta a Productos</button>
			</Link>
		</div>
	);
};
