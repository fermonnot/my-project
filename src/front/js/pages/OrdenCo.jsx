import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";


export const OrdenCo = () => {
	const { store, actions } = useContext(Context);

	let alertDelete = () => {
        
        swal({
            title:"Eliminar",
            text: "Seguro que deseas borrar este Producto?",
            icon: "warning",
            buttons: ["No","Si"]

        }).then(respuesta => {
            if (respuesta) {
				
                swal({
                    text:"Su producto ha sido borrado con éxito!",
                    icon: "success"
                });
				return true
				
            }
        })
		
		
		
	}

	// PREGUNTAR PARA QUE ME FUNCIONE EL CONDICIONAL QUE AL HACER CLICK EN SI SE EJECUTE Y NO ANTES
	let handleDelete= (id) => {   

		alertDelete();	
		actions.deleteProduct(id)
        
	}




	return (
		<div className="container">
			<table className="table table-striped text-center">
				<thead>
					<tr>
						<th scope="col">Descripción</th>
						<th scope="col">Laboratorio</th>
						<th scope="col">Precio (Bs)</th>
						<th scope="col">Cantidad a Comprar</th>
						<th scope="col">Accción</th>
					</tr>
				</thead>
				<tbody>
					{store.products.map((products, i) => {
						return (
							<tr key={i}>
								<td>{products.description}</td>
								<td>{products.laboratory}</td>
								<td>{products.price}</td>
								<td><input type="text"  /></td>
								<td>
									<div>
									<button type="buttom" className="btn btn-primary">Agregar</button>
									</div>	
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
