import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { Item } from "./Item.jsx";


export const Carrito = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => { actions.getOrdenCo() }, [store.OrdenCo])

    let alert = () => {
        swal({
            title: "¡ Procesado !",
            text: "Su pedido ha sido registrado satisfactoriamente!, en breves momentos la empresa lo contactará",
            icon: "success",
            button: "Aceptar"
        });
    }


    return (
        <>
            <div className="container">
                <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th scope="col">Descripción</th>
                            <th scope="col">Laboratorio</th>
                            <th scope="col">Precio (Bs)</th>
                            <th scope="col">Accción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.ordenCo.map((products, i) => {
                            return (
                                <Item key={i} product={products} isCart={true} />
                            )
                        })}
                    </tbody>
                </table>
                <br />
                <Link to="/order">
                    <button className="btn btn-primary">Vuelta a Orden</button>
                </Link>

                <button className="btn btn-primary mx-3"
                    onClick={() => alert()}>Finalizar Compra</button>

            </div>
        </>
    );
};