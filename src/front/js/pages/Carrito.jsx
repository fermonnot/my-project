import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { Item } from "./Item.jsx";


export const Carrito = () => {
    const { store, actions } = useContext(Context);
    const [totalPrice, setTotalPrice] = useState(0)



    let alert = () => {
        swal({
            title: "¡ Procesado !",
            text: "Su pedido ha sido registrado satisfactoriamente!, en breves momentos la empresa lo contactará",
            icon: "success",
            button: "Aceptar"
        });
    }
    let total = () => {
        let sum = 0
        store.ordenCo?.map((item) => {
            console.log(item.amount)
            sum += item.amount
        })
        console.log(sum)
        setTotalPrice(sum)

    }
    useEffect(() => {
        
        if (store.ordenCo.length > 0) {
            
            total()
        }else{
            setTotalPrice(0)
        }
        if(!store.ordenCo){
            actions.getOrdenCo()
        }
        
    }, [store.ordenCo])
    return (
        <>
            <div className="container">
                <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th scope="col">Descripción</th>
                            <th scope="col">Laboratorio</th>
                            <th scope="col">Precio C/U</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Sub-total </th>
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
                <div className="w-100 justify-centet">
                    TOTAL: <b>{store.ordenCo.length>0 ? totalPrice : 0} Bs</b>
                </div>
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