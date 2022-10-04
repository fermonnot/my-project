import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import swal from "sweetalert"


const INITIAL_PRODUCT = { description: "", laboratory: "", price: "", quantity: "" }
export const Handlep = () => {
    
    const { store, actions } = useContext(Context);
    const [product, setProduct] = useState(INITIAL_PRODUCT);

    let handleChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
        console.log(product)
    };


    let alert= () => {
        swal({
            title:"Guardado!",
            text: "Producto Agregado Satisfactoriamente",
            icon: "success",
            button: "Aceptar"
        });
    }


    
    

    
    // el preventDefault es para evitar refrescar la pagina web
    let handleSubmit = (event) => {   
        event.preventDefault()
        actions.addProduct(product);
        alert()  
        

    }
    

    return (
        <div className="container">
            <div className="list-group">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Descripción</label>
                        <input name="description" value={product.description} type="description" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
                        <div id="emailHelp" className="form-text">Nombre y descripción del producto.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputlaboratory1" className="form-label">Laboratorio</label>
                        <input type="laboratory" name="laboratory" value={product.laboratory} className="form-control" id="exampleInputlaboratory1" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputlaboratory1" className="form-label">Precio</label>
                        <input type="laboratory" name="price" value={product.price} className="form-control" id="exampleInputlaboratory1" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputlaboratory1" className="form-label">Cantidad</label>
                        <input type="laboratory" name="quantity" value={product.quantity} className="form-control" id="exampleInputlaboratory1" onChange={handleChange} />
                    </div>
                    <div >
                    <button type="submit" 
                        className="btn btn-primary"   
                        onClick={handleSubmit}>Save
                    </button>
                    </div>
                </form>

            </div>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Vuelta a Productos</button>
            </Link>
        </div>
    );
};
