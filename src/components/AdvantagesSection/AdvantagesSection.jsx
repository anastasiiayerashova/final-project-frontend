import s from './AdvantagesSection.module.css';

const AdvantagesSection = () => {
  return (
    <div className={s.container}>
      <div className={s.container_customers}>
        <img className={s.customers_img_first} alt="first customer" />
        <img className={s.customers_img_second} alt="second customer" />
        <img className={s.customers_img_third} alt="third customer" />

        <p className={s.customers_text}>
          Our <span className={s.customers_text_happy}>happy</span> customers
        </p>
      </div>
      <div className={s.container_benefits}>
        <ul className={s.benefits_list}>
          <li className={s.benefits_item_one}>
            <svg width="8" height="8" className={s.ellipse_icon}>
              <use href="/sprite.svg#Ellipse"></use>
            </svg>
            Habit drive
          </li>
          <li className={s.benefits_item_two}>View statistics</li>
          <li className={s.benefits_item_three}>Personal rate setting</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvantagesSection;