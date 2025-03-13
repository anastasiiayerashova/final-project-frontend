import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import s from './WaterForm.module.css';
import { useId } from 'react';

const WaterForm = () => {
  const { t } = useTranslation();
  const timeId = useId();
  const amountId = useId();

  const schema = yup.object().shape({
    time: yup
      .string()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, t('validation.valid_time'))
      .required(t('validation.time_required')),
    amount: yup
      .number()
      .typeError(t('validation.number_amount'))
      .positive(t('validation.number_positive'))
      .min(50, t('validation.number_min'))
      .max(5000, t('validation.number_max'))
      .required(t('validation.water_required')),
  });

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { time: '', amount: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const onErrors = (errors) => {
    console.log(errors);
  };

  const [amount, setAmount] = useState(50);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleStepChange = (step) => {
    setAmount((prevAmount) => {
      const newAmount = prevAmount + step;
      return Math.min(5000, Math.max(0, newAmount)); // ограничиваем 0 - 5000
    });
  };

  // const handleInputChange = (e) => {
  //     let value = Number(e.target.value);
  //     if (isNaN(value)) return; // защита от NaN

  //     value = Math.min(5000, Math.max(0, value)); // ограничиваем диапазон
  //     setAmount(value);
  // };

  const timeValue = watch('time');
  const amountValue = watch('amount');

  useEffect(() => {
    if (timeValue) {
      trigger('time');
    }
  }, [timeValue, trigger]);

  useEffect(() => {
    if (amountValue) {
      trigger('amount');
    }
  }, [amountValue, trigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onErrors)}>
      <div className={s.inputGroup}>
        <label htmlFor="amount" className={s.descrAmount}>
          {t('waterModal.water_amount')}:
        </label>
        <div className={s.controls}>
          <button
            className={s.minusButton}
            disabled
            type="button"
            onClick={() => handleStepChange(-50)}
          >
            <svg className={s.iconMinus}>
              <use href="../../../public/sprite.svg#minus-plus"></use>
            </svg>
          </button>
          <input
            className={s.input}
            id="amount"
            value={`${amount} ml`}
            readOnly
          />
          <button
            className={s.plusButton}
            type="button"
            onClick={() => handleStepChange(50)}
          >
            <svg className={s.iconPlus}>
              <use href="../../../public/sprite.svg#plus-minus"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={s.inputGroup}>
        <label htmlFor={timeId} className={s.timeLabel}>
          {t('waterModal.record_time')}:
        </label>
        <input
          className={`${s.timeInput} ${errors.time ? s.inputError : ''}`}
          id={timeId}
          type="text"
          placeholder="7:00" //add time
          {...register('time')}
        />
        {errors.time && <p className={s.error}>{errors.time.message}</p>}
      </div>
      <div className={s.inputGroup}>
        <label htmlFor={amountId} className={s.manualInput}>
          {t('waterModal.enter_water_value')}:
        </label>
        <input
          type="number"
          id={amountId}
          className={`${s.waterInput} ${errors.amount ? s.inputError : ''}`}
          placeholder="50"
          {...register('amount')}
        />
        {errors.amount && <p className={s.error}>{errors.amount.message}</p>}
      </div>
      <button className={s.saveBtn}>{t('common.save')}</button>
    </form>
  );
};

export default WaterForm;
