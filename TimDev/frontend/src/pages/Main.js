import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import logo from "../Img/logo.png";
import like from "../Img/like.png";
import deslike from "../Img/dislike.png";
import "./Main.css";
import api from "../services/api";

export default function Main({ match }){
    const [users, setUser] = useState([]);
    useEffect(() => {
        async function LoadUser(){
            const response = await api.get("/devs", {
                headers: {
                    user: match.params.id,
                }
            })
            setUser(response.data);
        }
        LoadUser();
    }, [match.params.id]);
    
    async function hendleLike(id){
        await api.post(`devs/${id}/likes`, null, {
            headers: { user: match.params.id }
        })

        setUser(users.filter(user => user._id != id));
    }
    async function hendleDisLike(id){
        await api.post(`devs/${id}/dislikes`, null, {
            headers: { user: match.params.id }
        })

        setUser(users.filter(user => user._id != id));
    }
    return (
        <div className="main-conteiner">
            <Link to="/">
             <img src={logo} alt="TimDev" />
             </Link>
             {users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                            <img src={user.avatar} alt="Avatar" />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => hendleDisLike(user._id)}><img src={deslike} alt="Deslike" /></button>
                                <button type="button" onClick={() => hendleLike(user._id)}><img src={like} alt="Like"/></button>
                            </div>
                        </li>
                        ))}
                    </ul>) : (
                        <div className="empty">Não tem mais Devs</div>
                    ) }
        </div>

    )
}