import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter} from 'react-router-dom';
import "bootstrap/dis/css/bootstrap.min.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

ReactDom.render(
    <HashRouter>
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
    </HashRouter>,
    document.querySelector("#container")
);
