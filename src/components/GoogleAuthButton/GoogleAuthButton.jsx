import { FcGoogle } from "react-icons/fc";
import s from './GoogleAuthButton.module.css'
import { api } from "../../utils/axios.config.js";

const GoogleAuthButton = ({ text }) => {
    
        const handleGoogleLogin = async () => {
            try {
                const res = await api.get('/auth/get-oauth-url')
                const {url} = res.data.data
                window.location.href = url
            }
            catch (e) {
                console.log('Error during getting oauth url:', e)
            }
        }
       
    return (
        <button onClick={handleGoogleLogin} className={s.button}>
            {text} <FcGoogle size={15}/>
        </button>
    )
}

export default GoogleAuthButton