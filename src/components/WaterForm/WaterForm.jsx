import { useState, useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addWater, fetchWaterDaily } from '../../redux/water/operations';
import s from './WaterForm.module.css';
import { useId } from 'react';
import { selectDate, selectLoading } from '../../redux/water/selectors';

const WaterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const timeId = useId();
  const amountId = useId();

  // Валидация
  const schema = yup.object().shape({
    time: yup
      .string()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Enter a valid time format')
      .required('Time is required'),
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .positive('Amount must be greater than 0')
      .min(50, 'Amount of water must be at least 50 ml')
      .max(5000, 'Amount of water cannot exceed 5000 ml')
      .required('Amount of water is required'),
  });

  // useForm настройки
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      time: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      amount: 50,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  // Состояние для количества воды
  const [amount, setAmount] = useState(50);

  // Получаем дату из Redux и форматируем
  const date = useSelector(selectDate);
  const dateFormatted = useMemo(() => date.split('T')[0], [date]);

  // Отслеживание значений формы
  const timeValue = watch('time');

  // Синхронизация amount с полем ввода
  useEffect(() => {
    setValue('amount', amount);
    trigger('amount'); // Теперь валидация происходит сразу при изменении
  }, [amount, setValue, trigger]);

  useEffect(() => {
    if (timeValue) trigger('time');
  }, [timeValue, trigger]);

  // Функция для обработки нажатий кнопок +/-
  const handleStepChange = (step) => {
    setAmount((prevAmount) => {
      const newAmount = prevAmount + step;
      return Math.min(5000, Math.max(50, newAmount));
    });
  };

  // Форматирование даты и времени для бэкенда
  const formatDate = (date, time) => {
    const [hours, minutes] = time.split(':');
    return `${date.toISOString().split('T')[0]}T${hours}:${minutes}`;
  };

  const onSubmit = async (values) => {
    try {
      const formattedDate = formatDate(new Date(), values.time);
      const requestData = {
        date: formattedDate,
        value: Number(values.amount),
      };

      await dispatch(addWater(requestData)).unwrap();

      toast.success('Water record added successfully!');

      // Ждем завершения dispatch(addWater), затем обновляем данные с сервера
      dispatch(fetchWaterDaily(dateFormatted));

      // Полностью сбрасываем состояние формы
      reset({
        time: new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        amount: 50,
      });

      setAmount(50);
      onClose();
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  const isLoading = useSelector(selectLoading);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputGroup}>
        <label htmlFor="amount" className={s.descrAmount}>
          Amount of water:
        </label>
        <div className={s.controls}>
          <button
            className={s.minusButton}
            type="button"
            onClick={() => handleStepChange(-50)}
            disabled={amount <= 50}
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
          Recording time:
        </label>
        <input
          className={`${s.timeInput} ${errors.time ? s.inputError : ''}`}
          id={timeId}
          type="text"
          placeholder="7:00"
          {...register('time')}
        />
        {errors.time && <p className={s.error}>{errors.time.message}</p>}
      </div>

      <div className={s.inputGroup}>
        <label htmlFor={amountId} className={s.manualInput}>
          Enter the value of the water used:
        </label>
        <input
          type="number"
          id={amountId}
          className={`${s.waterInput} ${errors.amount ? s.inputError : ''}`}
          placeholder="50"
          {...register('amount')}
          value={amount}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) {
              setAmount(value);
            }
          }}
        />
        {errors.amount && <p className={s.error}>{errors.amount.message}</p>}
      </div>

      <button
        className={`${s.saveBtn} ${isLoading ? s.loading : ''}`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default WaterForm;
