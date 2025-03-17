import { TourProvider } from "@reactour/tour";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tourStepsStyles, disableBody, enableBody } from "./TourStepsStyles.js";

const TourSteps = ({ children, onFinish }) => {
    const location = useLocation()
    
    const isOnTrackerPage = location.pathname === '/tracker'

    const tourFinished = localStorage.getItem('tourFinished')

    const steps = [
        {
            content: (
                <div style={{ margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{marginBottom: '10px', fontWeight: 700}}>Thank you for signing up!</h2>
                    <p style={{fontWeight: 400}}>Track your water consumption easily with us!</p>
                </div>
            ), position: "center"
        }, 
        {
            selector: '.logo',
            content: 'Built with passion by a team of talented developers, just for you!'
        },
        {
            selector: '.first-step',
            content: 'Here is your daily water goal. Try to reach it every day!',
        },
        {
            selector: '.second-step',
            content: 'This shows your current water intake for today or selected date'
        },
        {
            selector: '.third-step',
            content: 'Click here to add a new portion of water!',
        },
        {
            selector: '.fourth-step',
            content: 'Click here to manage your profile and settings!',
        },
        {
            selector: '.fifth-step',
            content: "Here you can see the amount of water you've consumed!",
        },
        {
            selector: '.sixth-step',
            content: 'Track your monthly progress – each circle shows your daily intake',
        },
        {
            selector: '.seventh-step',
            content: 'Click here to view your water consumption chart!',
        }
    ]

    const handleCloseTour = () => {
        localStorage.setItem('tourFinished', 'true')

        if (onFinish) {
            onFinish()
        }

        enableBody()
    }

    return (
        <TourProvider
            steps={steps}
            scrollSmooth
            styles={tourStepsStyles}
            defaultOpen={tourFinished !== true && isOnTrackerPage}
            badgeContent={({ totalSteps, currentStep }) => currentStep + 1 + "/" + totalSteps}
            beforeClose={handleCloseTour}
            // afterOpen={() => { disableBody() }}
        >
            {children}
        </TourProvider>
    )
}

export default TourSteps