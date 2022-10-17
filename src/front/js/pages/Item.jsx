import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";



export const Item = ({ product, isCart }) => {
    console.log(isCart)
    const [ordenco, setOrdenco] = useState({ quantity: 0, price: 0 })
    const { actions } = useContext(Context)



    console.log(product)
    const handleChange = (event) => {
        setOrdenco({
            ...ordenco,
            [event.target.name]: event.target.value,
        });

    };

    const addProduct = (product) => {
        if (ordenco.quantity <= 0) {
            console.log("debe ser > 0")

        } else {
            actions.addOrdenCo({
                amount: ordenco.quantity * product.price,
                quantity: ordenco.quantity,
                product_id: product.id,

            })
        }
        console.log(ordenco)
    }
    console.log(isCart)
    return (
        <tr>

            {
                isCart ?
                
                    <>
                        <td>{product.product.description}</td>
                        <td>{product.product.laboratory}</td>
                        <td>{product.product.price} Bs</td>
                        <td>{product.quantity}</td>
                        <td>{product.amount} Bs</td>

                        <td>
                            <div>
                                <button type="buttom"
                                    className="btn btn-primary"
                                    >Eliminar</button>
                            </div>
                        </td>
                    </>
                    :
                    <>
                        <td>{product.description}</td>
                        <td>{product.laboratory}</td>
                        <td>{product.price}</td>
                        
                        <td><input type="number" onChange={handleChange}
                            name="quantity"
                        // value={ordenco.quantity}
                        /></td>
                        <td>
                            <div>
                                <button type="buttom"
                                    className="btn btn-primary"
                                    onClick={() => addProduct(product)}>Agregar</button>
                            </div>
                        </td>

                    </>
            }

        </tr>
    )
}