import { useSelector } from 'react-redux';
import s from './ChooseDate.module.css';
import { selectDate } from '../../redux/water/selectors';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const ChooseDate = () => {
  const {t} = useTranslation()
  const date = useSelector(selectDate);
  const day = new Date(date).toISOString().split('T')[0];
  const today = new Date().toISOString().split('T')[0];

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat(i18next.language, { month: 'long' }).format(
      dateObj,
    );
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)
    return `${day}, ${capitalizedMonth}`;
  };
  const formattedDate = formatDate(date);

  return (
    <div>
      <h3 className={s.title}>{day === today ? t('trackerPage.today') : formattedDate}</h3>
    </div>
  );
};

export default ChooseDate;
