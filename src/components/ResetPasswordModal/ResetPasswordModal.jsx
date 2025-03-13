import s from './ResetPasswordModal.module.css'

const ResetPasswordModal = () => {

      return (
           <div className={s.delete_wrapper}>
              <div className={s.delete_desc}>
                 <h3>Email with password reset instructions sent!</h3>
                 <p>Please, check your email</p>
              </div>
              <div className={s.delete_btns}>
                 <button className={`${s.button} ${s.delete_btn}`}><a href="/" className={s.signup}>Go Home</a></button>
              </div>
           </div>
  );
};

export default ResetPasswordModal