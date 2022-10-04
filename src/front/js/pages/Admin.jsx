import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import "../../styles/admin.css"

export const Admin = () => {
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
						<th scope="col">Cantidad</th>
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
								<td>{products.quantity}</td>
								<td>
									<div>
									<i
										onClick={()=>handleDelete(products.id)}
										className="close far fa-times-circle mx-5 p-2"
										type="button">
									</i>
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
