import s from './SharedLayout.module.css';

export function SharedLayout ({ children }) {
  return <div className={s.container}>{children}</div>;
};

