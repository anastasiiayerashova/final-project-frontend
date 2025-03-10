import clsx from 'clsx';
import s from './AddWaterBtn.module.css'

const AddWaterBtn = ({ onClick, small }) => {
 
    return(
        <button className={clsx(small ? s.small : s.btn)} onClick={onClick}><span className={s.plus}></span>Add water</button>
    )
}
export default AddWaterBtn;