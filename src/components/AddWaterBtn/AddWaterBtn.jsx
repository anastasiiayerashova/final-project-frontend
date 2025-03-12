import clsx from 'clsx';
import s from './AddWaterBtn.module.css'

const AddWaterBtn = ({ onClick, small, inDailyInfo }) => {
 
    return( !inDailyInfo ? (
        <button className={clsx(small ? s.small : s.btn)} onClick={onClick}><span className={s.plus}></span>Add water</button>
    ) : (
            <button className={s.detailsAddBtn} onClick={onClick}>
                <div className={s.iconContainer}>
                    <svg className={s.icon}>
                        <use href="/sprite.svg#plus-green"></use>
                    </svg>
                </div>
                <p className={s.detailsBtnText}>Add water</p>
            </button>
    )
    )
}
export default AddWaterBtn;