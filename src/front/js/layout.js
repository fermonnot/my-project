import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Products } from "./pages/Products.jsx";
import { Admin } from "./pages/Admin.jsx";
import { Single } from "./pages/single";
import { Handlep } from "./pages/HandleP.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import {AboutUs} from "./pages/AboutUs.jsx";
import {OrdenCo} from "./pages/OrdenCo.jsx";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>

                        
                        

                        <Route element={<Products />} path="/" />
                        <Route element={<Admin />} path="/admin" />
                        <Route element={<Handlep />} path="/handlep" />
                        <Route element={<Single />} path="/single/:theid" />

                        <Route element={<Register />} path="/Register" />
                        <Route element={<Login />} path="/Login" />
                        <Route element={<AboutUs />} path="/about" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
