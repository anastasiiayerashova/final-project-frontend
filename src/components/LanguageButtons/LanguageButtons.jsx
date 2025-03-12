import s from './LanguageButtons.module.css'

const LanguageButtons = () => {
    return (
        <div className={s.language_buttons_wrapper}>
            <button className={s.btn}>UA</button>
            <button className={s.btn}>EN</button>
        </div>
    )
 }

export default LanguageButtons