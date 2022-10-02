import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import "../../styles/admin.css"

export const Admin = () => {
	const { store, actions } = useContext(Context);

	
	let handleDelete= (product) => {   
        
        actions.deleteProduct(product)

    }



	return (
		<div className="container">
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Description</th>
						<th scope="col">Laboratory</th>
						<th scope="col">Price (Bs)</th>
						<th scope="col">Quantity</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{store.products.map((products, i) => {
						return (
							<tr key={i}>
								<td>{products.description}</td>
								<td>{products.laboratory}</td>
								<td>{products.price}</td>
								<td>{products.quantity}</td>
								<td>
									<i
										onClick={handleDelete}
										className="close far fa-times-circle mx-5 p-2"
										type="button">
									</i>
									<i className="fas fa-pencil-alt" type="button"></i>		
								</td>
					
							</tr>
						)
					})}
				</tbody>
			</table>
			<br />
			<Link to="/">
				<button className="btn btn-primary">Vuelta a Productos</button>
			</Link>
			<Link to="/handlep">
				<button className="btn btn-primary mx-3">Agregar Productos</button>
			</Link>
		</div>
	);
};
