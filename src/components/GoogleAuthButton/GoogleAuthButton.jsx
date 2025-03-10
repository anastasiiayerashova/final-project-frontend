import { FcGoogle } from "react-icons/fc";
import s from './GoogleAuthButton.module.css'

const GoogleAuthButton = ({text}) => {
    return (
        <a href="" className={s.button}>
            {text} <FcGoogle size={15}/>
        </a>
    )
}

export default GoogleAuthButton