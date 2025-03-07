import s from './UserBarPopover.module.css';

const UserBarPopover = () => {
  return (
    <div className={s.barPopover}>
      <button className={s.barBtn}>
        <svg className="comment-prev-btn" width="16" height="16">
          <use
            href="/sprite.svg#chevron-down"
            className="reviews-btn-svg"
          ></use>
        </svg>
        <p>Setting</p>
      </button>
      <button className={s.barBtn}>
        <svg className="comment-prev-btn" width="16" height="16">
          <use
            href="/sprite.svg#chevron-down"
            className="reviews-btn-svg"
          ></use>
        </svg>
        <p>Log out</p>
      </button>
    </div>
  );
};

export default UserBarPopover;
