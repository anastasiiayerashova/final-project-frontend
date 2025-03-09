import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx'
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm.jsx'
import s from './ResetPasswordPage.module.css'
import { Toaster } from 'react-hot-toast';

const ResetPasswordPage = () => { // после клика на reset password попадаем сюда 
    return (
        <div className={s.main_wrapper}>
            <div>
                <ResetPasswordForm/> 
            </div>
            <div className={s.advantages_wrapper}>
                <AdvantagesSection/>
            </div>
            <Toaster position='top-right'/>
        </div>
    )
}

export default ResetPasswordPage