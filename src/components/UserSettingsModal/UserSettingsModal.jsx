import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx'
import s from './UserSettingsModal.module.css'

const UserSettingsModal = () => {
    return (
        <>
            <div className={s.container}>
                <UserSettingsForm/>
            </div>
        </>
    )
 }

export default UserSettingsModal