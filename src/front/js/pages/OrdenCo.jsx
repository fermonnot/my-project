import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

const initalState = { product_id: "", status: "processing", quantity: "", amount: 0, user_id: 1 }
export const OrdenCo = () => {
	const { store, actions } = useContext(Context);
	const [ordenco, setOrdenco] = useState(initalState)

	const handleChange = (event) => {
		setOrdenco({
			...ordenco,
			[event.target.name]: event.target.value,
		});

	};

	const addProduct = (productId, productsPrice) => {
		if (ordenco.quantity <= 0) {
			console.log("debe ser > 0")

		} else {
			setOrdenco({
				...ordenco, product_id: productId, amount: productsPrice * ordenco.quantity
			})
		}
		console.log(ordenco)
	}




	let alertDelete = () => {

		swal({
			title: "Eliminar",
			text: "Seguro que deseas borrar este Producto?",
			icon: "warning",
			buttons: ["No", "Si"]

		}).then(respuesta => {
			if (respuesta) {

				swal({
					text: "Su producto ha sido borrado con éxito!",
					icon: "success"
				});
				return true

			}
		})



	}

	// PREGUNTAR PARA QUE ME FUNCIONE EL CONDICIONAL QUE AL HACER CLICK EN SI SE EJECUTE Y NO ANTES
	let handleDelete = (id) => {

		alertDelete();
		actions.deleteProduct(id)

	}

	useEffect(() => { actions.getOrdenCo() }, [store.OrdenCo])


	return (
		<>
			<div className="container">
				<ul>
					{store.ordenCo.map((ordenco, i) => {
						return (

							<div key={i}>
								<li> product_id{ordenco.product_id}</li>
								<li> status {ordenco.status}</li>
								<li> quantity {ordenco.quantity}</li>
								<li> amount {ordenco.amount}</li>
							</div>
						)

					})}
				</ul>
			</div>
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
									<td><input type="text" onChange={handleChange}
										name="quantity"
									// value={ordenco.quantity}
									/></td>
									<td>
										<div>
											<button type="buttom"
												className="btn btn-primary"
												onClick={() => addProduct(products.id, products.price)}>Agregar</button>
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
		</>
	);
};
