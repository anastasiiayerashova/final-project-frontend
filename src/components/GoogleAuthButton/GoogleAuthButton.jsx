import { FcGoogle } from "react-icons/fc";
import s from './GoogleAuthButton.module.css'

const GoogleAuthButton = () => {
    return (
        <a href="" className={s.button}>
            Sign in with Google <FcGoogle size={15}/>
        </a>
    )
}

export default GoogleAuthButton