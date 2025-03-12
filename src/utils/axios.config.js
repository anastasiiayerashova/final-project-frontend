import axios from "axios"

export const api = axios.create({
    baseURL: 'https://aquatrack-bd.onrender.com',
    withCredentials: true 
})


export const setAuthHeader = (token) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const clearAuthHeader = () => {
    api.defaults.headers.common.Authorization = ''
}