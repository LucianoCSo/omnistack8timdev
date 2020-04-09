import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Login from "./pages/login";
import Main from "./pages/Main";

export default function Routs(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/dev/:id" component={Main} />
        </BrowserRouter>
    );
}