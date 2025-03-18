import s from './Dot.module.css';

const Dot = ({ active, payload, coordinate }) => {
  if (!active || !payload || !payload.length) return null;

  const { value } = payload[0];

  return (
    <div
      className={s.tooltip}
      style={{
        left: `${coordinate.x}px`,
        top: `${coordinate.y - 50}px`,
        transform: 'translateX(-50%)', // Центрирование по оси X
      }}
    >
      {value} ml
    </div>
  );
};

export default Dot;
