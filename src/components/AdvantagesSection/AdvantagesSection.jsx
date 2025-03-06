import s from './AdvantagesSection.module.css'

const AdvantagesSection = () => {
  return (
    <div className={s.advantages_section}>
      <div className={s.advantages_blocks}>
        <div className={s.images_block}>
          <ul> 
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <p>Our happy customers</p>
        </div>
        
      
        <div className={s.info_container}>
         <div className={s.info_blocks}>
          <p>Habit drive</p>
          <p>View statistics</p>
          <p>Personal rate setting</p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesSection;
