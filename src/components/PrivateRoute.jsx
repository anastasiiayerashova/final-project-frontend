import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, redirectTo = '' }) => { 
    return Component
}