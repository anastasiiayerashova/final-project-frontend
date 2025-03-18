import { TourProvider } from '@reactour/tour';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { tourStepsStyles, disableBody, enableBody } from './TourStepsStyles.js';

const TourSteps = ({ children, onFinish }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const isOnTrackerPage = location.pathname === '/tracker';

  const tourFinished = localStorage.getItem('tourFinished');

  const steps = [
    {
      content: (
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '10px', fontWeight: 700, fontSize: '18px' }}>
            {t('tourSteps.thank_you')}
          </h2>
          <p style={{ fontWeight: 400 }}>{t('tourSteps.track_water')}</p>
        </div>
      ),
      position: 'center',
    },
    {
      selector: '.logo',
      content: t('tourSteps.built'),
    },
    {
      selector: '.first-step',
      content: t('tourSteps.daily_water_goal'),
    },
    {
      selector: '.second-step',
      content: t('tourSteps.current_water_intake'),
    },
    {
      selector: '.third-step-1',
      content: t('tourSteps.add_new_portion'),
    },
    {
      selector: '.third-step-2',
      content: t('tourSteps.or_add_new_portion'),
    },
    {
      selector: '.fourth-step',
      content: t('tourSteps.settings'),
    },
    {
      selector: '.fifth-step',
      content: t('tourSteps.consumed_water'),
    },
    {
      selector: '.sixth-step',
      content: t('tourSteps.monthly_progress'),
    },
    {
      selector: '.seventh-step',
      content: t('tourSteps.consumption_chart'),
    },
  ];

  const handleCloseTour = () => {
    localStorage.setItem('tourFinished', 'true');

    if (onFinish) {
      onFinish();
    }

    enableBody();
  };

  return (
    <TourProvider
      steps={steps}
      scrollSmooth
      disableInteraction={true}
      styles={tourStepsStyles}
      defaultOpen={tourFinished !== true && isOnTrackerPage}
      badgeContent={({ totalSteps, currentStep }) =>
        currentStep + 1 + '/' + totalSteps
      }
      beforeClose={handleCloseTour}
      afterOpen={() => {
        disableBody();
        }}
    >
      {children}
    </TourProvider>
  );
};

export default TourSteps;
