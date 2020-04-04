import React, { useState } from "react";
import logo from "../Img/logo.png";
import Api from "../services/api";
import "./login.css";

    export default function Login({history}){

    const [username, setUsername] = useState("");

    async function handleSubimit(e){
        e.preventDefault();

        const response = await Api.post("/devs", {
            username,
        });

        const { _id } = response.data;
        history.push(`/dev/${_id}`)
    }
    return (
        <div className="login-container">          
            <form onSubmit={handleSubimit}>
                <img src={logo} alt="TimDev" />
                <input placeholder="Digite seu Usuário de GitHub"
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

