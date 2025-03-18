import { useEffect, useState } from 'react';

export const useLastFocusedField = () => {
  const [lastFocusedField, setLastFocusedField] = useState(null);

  useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && event.target.name) {
        setLastFocusedField(event.target.name); // Зберігаємо name активного поля
      }
    };

    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, []);

  // Функція для повернення фокусу на останнє поле
  const restoreFocus = () => {
    if (lastFocusedField) {
      const inputElement = document.querySelector(
        `[name="${lastFocusedField}"]`,
      );
      
      if (inputElement) inputElement.focus();
    }
  };

  return { lastFocusedField, restoreFocus };
};
