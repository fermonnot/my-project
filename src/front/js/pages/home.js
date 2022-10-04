import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
	<>
	<div className="container">
        <div className="row">
          {store.token.length <= 0 ? (
            <h1>Intente de nuevo</h1>
          ) : (
            <h1>Bienvenido</h1>
          )}
        </div>
      </div>
	</>
			
	);
};
