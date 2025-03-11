import s from './Loader.module.css'

const Loader = () => {
    return (
        <div className={s.loaderWrapper}>
            <span className={s.loader}></span>
        </div>
    )
 }

export default Loader