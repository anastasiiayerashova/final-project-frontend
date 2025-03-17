import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { api } from '../../utils/axios.config.js'
import { resetToken } from '../../redux/user/slice.js'
import Loader from '../../components/Loader/Loader.jsx'
import { loginWithGoogleOperation } from '../../redux/user/operations.js'

const GooglePage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const code = searchParams.get('code')

    useEffect(() => {
        const fetch = () => {
            try {
                const queryParams = new URLSearchParams(location.search)
                const code = queryParams.get('code')

                if (code) {
                    dispatch(loginWithGoogleOperation()).then(() => {
                        navigate('/tracker')
                    })
                }
            }
            catch (e) {
                console.log(e)
                navigate('/signup')
            }
        }
        fetch()
    }, [location, navigate])

    return (
        <div>
            <Loader/>
        </div>
    )
}

export default GooglePage