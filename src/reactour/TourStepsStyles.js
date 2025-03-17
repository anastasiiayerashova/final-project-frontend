import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

export const disableBody = () => {
    disableBodyScroll(document.body)
}

export const enableBody = () => {
    enableBodyScroll(document.body)
}

export const tourStepsStyles = {
    popover: (base) => ({
        ...base,
        fontFamily: 'Poppins',
        '--reactour-accent': '#9be1a0',
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 10,
        boxShadow: '0 0 3em rgba(0, 0, 0, 0.5)'
    }),
    close: (base) => ({
        ...base,
        color: '#9be1a0',
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '20px',
        cursor: 'pointer'
    }),
}