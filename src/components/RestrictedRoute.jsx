import { Navigate } from 'react-router-dom'

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => { 
    return Component
}