import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import s from './GoogleAuthButton.module.css'
import { api } from "../../utils/axios.config.js";
import { useNavigate, NavLink } from "react-router-dom";

const getUrl = async () => await api.get('/auth/get-oauth-url')

const GoogleAuthButton = ({ text }) => {
    
    const [url, setUrl] = useState('')

    useEffect(() => {
        async function getData() {
            const { data: { data } } = await getUrl()
            console.log('🔍 Google OAuth URL:', data.url);
            setUrl(data.url)
        }
        getData()
    }, [])

    return (
        <NavLink to={url} className={s.button}>
            {text} <FcGoogle size={15}/>
        </NavLink>
    )
}

export default GoogleAuthButton