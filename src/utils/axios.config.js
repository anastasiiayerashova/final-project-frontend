import axios from "axios"
import { store } from "../redux/store.js"
import { resetToken, refreshError } from "../redux/user/slice.js"
import { refreshUserOperation } from "../redux/user/operations.js"

export const api = axios.create({
    baseURL: 'https://aquatrack-bd.onrender.com',
    withCredentials: true 
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const accessToken = await store.dispatch(refreshUserOperation()).unwrap()
                console.log(accessToken)

                setAuthHeader(accessToken)

                store.dispatch(resetToken(accessToken))

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

                return api(originalRequest)
            }
            catch (e) {
                console.log('Error during refreshing', e)
                store.dispatch(refreshError())
            }
        }
        if (error.response.status === 400 ||
            error.response.status === 404 ||
            error.response.status === 409 ||
            error.response.status === 500 
        ) {
            return Promise.reject(error)
        }
    }
)

export const setAuthHeader = (token) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const clearAuthHeader = () => {
    api.defaults.headers.common.Authorization = ''
}