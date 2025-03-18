import s from './AdvantagesSection.module.css';
import { api } from '../../utils/axios.config.js';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AdvantagesSection = () => {
  const [users, setUsers] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const {
          data: { data },
        } = await api.get('/auth/count');
        setUsers(data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, []);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.container_customers}>
          <img className={s.customers_img_first} alt="first customer" />
          <img className={s.customers_img_second} alt="second customer" />
          <img className={s.customers_img_third} alt="third customer" />
          <p
            className={s.customers_text}
            dangerouslySetInnerHTML={{
              __html: t('advantagesSection.customers_text', {
                count: users,
                class: s.customers_text_happy,
              }),
            }} />
         </div>
         <div className={s.container_benefits}>
          <ul className={s.benefits_list}>
            <li className={s.benefits_item_one}>
              <svg width="8" height="8" className={s.ellipse_icon}>
                <use href="/sprite.svg#Ellipse"></use>
              </svg>
              {t('advantagesSection.habit_drive')}
            </li>
            <li className={s.benefits_item_two}>
              {t('advantagesSection.view_statistic')}
            </li>
            <li className={s.benefits_item_three}>
              {t('advantagesSection.personal_rate_setting')}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection